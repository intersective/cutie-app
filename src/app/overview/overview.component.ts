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
      this.experiences = res;
      this.experiencesRaw = res;
      this.calculateStatistics();
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
    });
  }

  calculateStatistics() {
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

  filterByTag(tag: Tag) {
    const index = this.tags.findIndex(t => t.id === tag.id);
    this.tags[index].active = !tag.active;
    const activeTagIds = this.tags.filter(t => t.active).map(t => t.id);
    if (!activeTagIds.length) {
      this.experiences = this.experiencesRaw;
    } else {
      this.experiences = this.experiencesRaw.filter(exp => exp.tags.find(t => activeTagIds.includes(t.id)));
    }
    this.calculateStatistics();
  }

  filterByStatus(status: string) {
    if (this.status === status) {
      return;
    }
    if (status === 'all') {
      this.experiences = this.experiencesRaw;
    } else {
      this.experiences = this.experiencesRaw.filter(exp => exp.status === status);
    }
    this.status = status;
    this.calculateStatistics();
  }

  filterByType(type: string) {
    if (this.type === type) {
      return;
    }
    if (type === 'all') {
      this.experiences = this.experiencesRaw;
    } else {
      this.experiences = this.experiencesRaw.filter(exp => exp.type === type);
    }
    this.type = type;
    this.calculateStatistics();
  }

}
