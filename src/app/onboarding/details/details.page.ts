import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from '@services/utils.service';
import { StorageService } from '@services/storage.service';

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
    public utils: UtilsService,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    if (!TERMS[this.type]) {
      this.router.navigate(['onboarding']);
    }
    this.questions = TERMS[this.type].questions.map(q => ({...q, ...{ answer: '' }}));
    this.projectIcon = this.utils.getIconForHeader(this.type);
    this.storage.set('selectedProjectIcon', this.projectIcon);
  }

  get pageTitle() {
    return `Let’s create your ${ TERMS[this.type].name } experience`;
  }

  get continueDisabled() {
    return this.questions.find(q => !q.answer);
  }

  submit() {
    this.storage.setOnboardingData({
      qna: this.questions.map(q => ({
        question: q.title,
        answer: q.answer,
      }))
    });
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
