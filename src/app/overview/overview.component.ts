import { Component, OnInit } from '@angular/core';
import { Experience, OverviewService } from './overview.service';

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
  tags = Array(5).fill(1).map((x, i) => {
    return {
      id: i,
      name: `tag${ i }`,
      active: Math.random() > 0.5,
      count: 1
    };
  });
  types = ['all', 'internship', 'mentoring', 'skills portfolio'];
  status = 'all';
  type = 'all';

  experiences: Experience[] = [];

  constructor(
    private service: OverviewService
  ) { }

  ngOnInit() {
    this.service.getExperiences().subscribe(res => {
      this.experiences = res;
    });
  }

  filterByStatus(status: string) {
    if (this.status === status) {
      return;
    }
    console.log('filter:', status);
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
