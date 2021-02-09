import { Component, OnInit } from '@angular/core';
import { Experience, Tag, OverviewService } from './overview.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  stats = [
    {
      label: 'Live experiences',
      value: ''
    },
    {
      label: 'Recently active participants and mentors',
      value: ''
    },
    {
      label: 'Feedback loops completed',
      value: ''
    },
    {
      label: 'Feedback quality score',
      value: ''
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
  tags = [];
  types = ['all'];
  status = 'all';
  type = 'all';

  experiencesRaw: Experience[] = [];
  experiences: Experience[] = [];

  constructor(
    private service: OverviewService
  ) { }

  ngOnInit() {
    this.service.getExperiences().subscribe(res => {
      this.experiencesRaw = res;
      // get all tags
      this.tags = [];
      res.forEach(exp => {
        exp.tags.forEach(t => {
          const index = this.tags.findIndex(tt => t.id === tt.id);
          if (index < 0) {
            this.tags.push({
              ...t,
              ...{
                count: 1,
                active: false
              }
            });
          } else {
            this.tags[index].count += 1;
          }
        });
      });
      // get all types
      this.types = [...['all'], ...res.map(exp => exp.type)];
      this.types = [...new Set(this.types)];
      this.filterAndOrder();
    });
  }

  filterAndOrder() {
    this.experiences = JSON.parse(JSON.stringify(this.experiencesRaw));
    this._filterByTag();
    this._filterByStatus();
    this._filterByType();
    this._sort();
    this._calculateStatistics();
  }

  private _filterByTag() {
    const activeTagIds = this.tags.filter(t => t.active).map(t => t.id);
    if (!activeTagIds.length) {
      return;
    }
    this.experiences = this.experiences.filter(exp => exp.tags.find(t => activeTagIds.includes(t.id)));
  }

  private _filterByStatus() {
    if (this.status === 'all') {
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
      } else {
        reviewRatingAvg = (reviewRatingAvg + stat.reviewRatingAvg) / 2;
      }
    });
    this.stats[0].value = liveExpCount.toString();
    this.stats[1].value = totalUsers ? `${ Math.round(activeUsers * 100 / totalUsers) }%` : '0%';
    this.stats[2].value = fbStarted ? `${ fbCompleted }/${ fbStarted }` : '0/0';
    this.stats[3].value = `${ Math.round(reviewRatingAvg * 100) }%`;
  }

}
