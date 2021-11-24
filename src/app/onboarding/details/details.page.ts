import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

const TERMS = {
  industryProject: {
    name: 'Industry Project',
  },
  internship: {
    name: 'Internship',
  },
  workSimulation: {
    name: 'Work Simulation',
  },
  mentoring: {
    name: 'Mentoring',
  },
  accelerator: {
    name: 'Accelerator',
  },
};

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  type: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
  }

  get pageTitle() {
    return `Let’s create your ${ TERMS[this.type].name } experience`;
  }

}
