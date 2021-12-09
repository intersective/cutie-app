import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from '@services/utils.service';

const generalQuestions = [
  {
    title: 'What is the type of your organisation?',
    options: ['Primary Education', 'Secondary Education', 'Higher Education', 'Business', 'Other']
  },
  {
    title: 'What is the closest duration range?',
    options: ['2 Weeks', '3 Weeks', '4 Weeks', '12 Weeks', 'More']
  },
  {
    title: 'How many learners will participate?',
    options: ['0-20', '21-100', '101-200', 'More']
  }
];
const TERMS = {
  industryProject: {
    name: 'Industry Project',
    questions: [
      {
        title: 'What is the type of your organisation?',
        options: ['Primary Education', 'Secondary Education', 'Higher Education', 'Business', 'Other']
      },
      {
        title: 'Which topic fits your program/curriculum?',
        options: ['Business', 'Marketing', 'Engineering', 'Other']
      },
      {
        title: 'What is the closest duration range?',
        options: ['2 Weeks', '3 Weeks', '4 Weeks', '12 Weeks', 'More']
      },
      {
        title: 'How many learners will participate?',
        options: ['0-20', '21-100', '101-200', 'More']
      }
    ]
  },
  internship: {
    name: 'Internship',
    questions: generalQuestions,
  },
  workSimulation: {
    name: 'Work Simulation',
    questions: generalQuestions,
  },
  mentoring: {
    name: 'Mentoring',
    questions: generalQuestions,
  },
  accelerator: {
    name: 'Accelerator',
    questions: generalQuestions,
  },
};

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  type: string;
  questions: any;
  projectIcon: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public utils: UtilsService
  ) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    if (!TERMS[this.type]) {
      this.router.navigate(['onboarding']);
    }
    this.questions = TERMS[this.type].questions.map(q => ({...q, ...{ answer: '' }}));
    this.projectIcon = this.utils.getIconForHeader(this.type);
  }

  get pageTitle() {
    return `Let’s create your ${ TERMS[this.type].name } experience`;
  }

  submit() {
    console.log('question & answers', this.questions);
    switch (this.type) {
      case 'industryProject':
        this.router.navigate(['onboarding', 'templates']);
        break;

      default:
        this.router.navigate(['onboarding', 'template', this.type]);
        break;
    }
  }

}
