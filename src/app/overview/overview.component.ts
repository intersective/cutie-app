import { Component, OnInit } from '@angular/core';
import { Experience, Statistics, Tag, OverviewService } from './overview.service';
import { UtilsService } from '@services/utils.service';
import { PopupService } from '@shared/popup/popup.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  stats = [
    {
      label: 'Live experiences',
      value: '',
      description: 'Displays all experiences which are currently live. An experience is live when the status is moved from "Draft" to "Live" and the content is now visible to all registered users.'
    },
    {
      label: 'Recently active participants and mentors',
      value: '',
      description: 'Reflects the percentage of participants who logged in at least once during the past 7 days out of the total number.'
    },
    {
      label: 'Feedback loops completed',
      value: '',
      description: `
        <p>Reflects the started and completed feedback loops. A feedback loop counts as completed if all stages are completed:</p>
        <ul>
          <li>Assessment submitted by a team</li>
          <li>Mentor reviewed assessment and submitted feedback</li>
          <li>Team members read feedback</li>
        </ul>
        <p>A feedback loop helps participants to process the way they learn in practice and is triggered after certain events (e.g. moderated assessment) which can happen multiple times over the duration of a program.</p>`
    },
    {
      label: 'Feedback quality score',
      value: '',
      description: `This is the average rating given by participants to mentors' feedback based on how helpful they find it (on a scale of 0-100%). It is done at the end of the feedback loop and can happen multiple times during the course of the program (e.g. moderated assessment). `
    }
  ];
  sortList = [
    'created time',
    'participant count',
    'mentor count',
    'recent active participants',
    'recent active mentors',
    'feedback loops completed',
    'on-track/off-track',
    'feedback quality score',
  ];
  sortDesc = true;
  sortBy = this.sortList[0];
  tags: Tag[] = [];
  types = ['all'];
  status = 'all';
  type = 'all';

  loadingExps = false;
  experiencesRaw: Experience[] = [];
  experiences: Experience[] = [];
  remainingExperiences: Experience[] = [];

  constructor(
    private service: OverviewService,
    private utils: UtilsService,
    private popupService: PopupService,
  ) { }

  ngOnInit() {
    this.loadExperiences();

    // when experience tags get updated, update the experiences data
    this.utils.getEvent('exp-tags-updated').subscribe(event => {
      this.experiences = this._updateTags(this.experiences, event.experience, event.tags);
      this.experiencesRaw = this._updateTags(this.experiencesRaw, event.experience, event.tags);
      this._getAllTags();
    });

    // when experience statistics get updated, update the experience statistics
    this.utils.getEvent('exp-statistics-updated').subscribe(event => {
      this.experiences = this._updateStatistics(this.experiences, event.experience, event.statistics);
      this.experiencesRaw = this._updateStatistics(this.experiencesRaw, event.experience, event.statistics);
      this._getAllTags();
    });

    // when experience get archived/deleted, reload the experiences data
    this.utils.getEvent('exps-reload').subscribe(event => {
      this.loadExperiences();
    });
  }

  loadExperiences() {
    this.loadingExps = true;
    this.service.getExperiences().subscribe(res => {
      // reformat tags from string[] to Tag[]
      this.experiencesRaw = res;
      // get all tags
      this._getAllTags();
      // get all types
      this.types = [...['all'], ...this.experiencesRaw.map(exp => exp.type)];
      this.types = [...new Set(this.types)];
      this.filterAndOrder();
      this.loadingExps = false;
    });
  }

  loadMore(event) {
    setTimeout(
      () => {
        this._renderExperiences(false);
        event.target.complete();
      },
      500
    );
  }

  private _renderExperiences(init = true) {
    const maxExp = 7;
    if (init) {
      // only display 7 experiences at once
      this.remainingExperiences = [];
      if (this.experiences.length > maxExp) {
        this.remainingExperiences = this.experiences.splice(maxExp, this.experiences.length - maxExp);
      }
    } else {
      // load 7 more experiences
      if (this.remainingExperiences.length <= maxExp) {
        this.experiences = [...this.experiences, ...this.remainingExperiences];
        this.remainingExperiences = [];
      } else {
        this.experiences = [...this.experiences, ...this.remainingExperiences.splice(0, maxExp)];
      }
    }
  }

  /**
   * Given experiences raw data, get all tags and the count for each of them
   */
  private _getAllTags() {
    this.tags = [];
    this.experiencesRaw.forEach(exp => {
      exp.tags.forEach(t => {
        const index = this.tags.findIndex(tt => t === tt.name);
        if (index < 0) {
          this.tags.push({
            name: t,
            count: 1,
            active: false
          });
        } else {
          this.tags[index].count += 1;
        }
      });
    });
  }

  private _updateTags(experiences: Experience[], experience: Experience, tags: string[]) {
    return experiences.map(exp => {
      if (exp.uuid === experience.uuid) {
        exp.tags = tags;
      }
      return exp;
    });
  }

  private _updateStatistics(experiences: Experience[], experience: Experience, statistics: Statistics) {
    return experiences.map(exp => {
      if (exp.uuid === experience.uuid) {
        exp.statistics = statistics;
      }
      return exp;
    });
  }

  filterAndOrder() {
    this.experiences = JSON.parse(JSON.stringify(this.experiencesRaw));
    this._filterByTag();
    this._filterByStatus();
    this._filterByType();
    this._sort();
    this._calculateStatistics();
    this._renderExperiences();
  }

  private _filterByTag() {
    const activeTags = this.tags.filter(t => t.active).map(t => t.name);
    if (!activeTags.length) {
      return;
    }
    this.experiences = this.experiences.filter(exp => exp.tags.find(t => activeTags.includes(t)));
  }

  private _filterByStatus() {
    if (this.status === 'all') {
      this.experiences = this.experiences.filter(exp => exp.status !== 'archived');
      return;
    }
    this.experiences = this.experiences.filter(exp => exp.status === this.status);
  }

  private _filterByType() {
    if (this.type === 'all') {
      return;
    }
    this.experiences = this.experiences.filter(exp => exp.type === this.type);
  }

  private _sort() {
    const index = this.sortList.findIndex(s => s === this.sortBy);
    switch (index) {
      case 0:
        if (!this.sortDesc) {
          this.experiences.reverse();
        }
        break;

      case 1:
        this.experiences.sort((a, b) => {
          if (this.sortDesc) {
            return a.statistics.registeredUserCount.participant > b.statistics.registeredUserCount.participant ? -1 : 1;
          }
          return a.statistics.registeredUserCount.participant < b.statistics.registeredUserCount.participant ? -1 : 1;
        });
        break;

      case 2:
        this.experiences.sort((a, b) => {
          if (this.sortDesc) {
            return a.statistics.registeredUserCount.mentor > b.statistics.registeredUserCount.mentor ? -1 : 1;
          }
          return a.statistics.registeredUserCount.mentor < b.statistics.registeredUserCount.mentor ? -1 : 1;
        });
        break;

      case 3:
        this.experiences.sort((a, b) => {
          if (this.sortDesc) {
            return a.statistics.activeUserCount.participant > b.statistics.activeUserCount.participant ? -1 : 1;
          }
          return a.statistics.activeUserCount.participant < b.statistics.activeUserCount.participant ? -1 : 1;
        });
        break;

      case 4:
        this.experiences.sort((a, b) => {
          if (this.sortDesc) {
            return a.statistics.activeUserCount.mentor > b.statistics.activeUserCount.mentor ? -1 : 1;
          }
          return a.statistics.activeUserCount.mentor < b.statistics.activeUserCount.mentor ? -1 : 1;
        });
        break;

      case 5:
        this.experiences.sort((a, b) => {
          if (this.sortDesc) {
            return a.statistics.feedbackLoopCompleted > b.statistics.feedbackLoopCompleted ? -1 : 1;
          }
          return a.statistics.feedbackLoopCompleted < b.statistics.feedbackLoopCompleted ? -1 : 1;
        });
        break;

      case 6:
        this.experiences.sort((a, b) => {
          if (this.sortDesc) {
            return a.statistics.onTrackRatio > b.statistics.onTrackRatio ? -1 : 1;
          }
          return a.statistics.onTrackRatio < b.statistics.onTrackRatio ? -1 : 1;
        });
        break;

      case 7:
        this.experiences.sort((a, b) => {
          if (this.sortDesc) {
            return a.statistics.reviewRatingAvg > b.statistics.reviewRatingAvg ? -1 : 1;
          }
          return a.statistics.reviewRatingAvg < b.statistics.reviewRatingAvg ? -1 : 1;
        });
        break;
    }
  }

  private _calculateStatistics() {
    let liveExpCount = 0;
    let activeUsers = 0;
    let totalUsers = 0;
    let fbCompleted = 0;
    let fbStarted = 0;
    let reviewRatingAvg = 0;
    this.experiences.forEach(exp => {
      if (exp.status === 'live') {
        liveExpCount ++;
      }
      const stat = exp.statistics;
      activeUsers += stat.activeUserCount.participant + stat.activeUserCount.mentor;
      totalUsers += stat.registeredUserCount.participant + stat.registeredUserCount.mentor;
      fbCompleted += stat.feedbackLoopCompleted;
      fbStarted += stat.feedbackLoopStarted;
      if (reviewRatingAvg === 0) {
        reviewRatingAvg = stat.reviewRatingAvg;
      } else if (stat.reviewRatingAvg > 0) {
        // if stat.reviewRatingAvg <= 0, don't count it for the average
        reviewRatingAvg = (reviewRatingAvg + stat.reviewRatingAvg) / 2;
      }
    });
    this.stats[0].value = liveExpCount.toString();
    this.stats[1].value = totalUsers ? `${ Math.round(activeUsers * 100 / totalUsers) }%` : '0%';
    this.stats[2].value = fbStarted ? `${ fbCompleted }/${ fbStarted }` : '0/0';
    this.stats[3].value = `${ Math.round(reviewRatingAvg * 100) }%`;
  }

  add() {
    this.popupService.showCreateExp();
  }

}
