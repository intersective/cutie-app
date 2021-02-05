import { Component, OnInit } from '@angular/core';

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
  tags = Array(5).fill(1).forEach((x, i) => {
    return {
      id: i,
      name: `tag${ i }`,
      active: Math.random() > 0.5
    };
  });

  constructor() { }

  ngOnInit() {console.log(this.tags)}

}
