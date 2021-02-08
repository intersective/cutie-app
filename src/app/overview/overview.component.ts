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
      value: '2'
    },
    {
      label: 'Recently active participants and mentors',
      value: '80%'
    },
    {
      label: 'Feedback loops completed',
      value: '902/2000'
    },
    {
      label: 'Feedback quality score',
      value: '91%'
    }
  ];
  tags = [];
  types = ['all', 'internship', 'mentoring', 'skills portfolio'];
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
    });
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
  }

  filterByType(type: string) {
    if (this.type === type) {
      return;
    }
    console.log('filter:', type);
    this.type = type;
  }

}
