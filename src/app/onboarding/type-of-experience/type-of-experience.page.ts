import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-of-experience',
  templateUrl: './type-of-experience.page.html',
  styleUrls: ['./type-of-experience.page.scss'],
})
export class TypeOfExperiencePage {

  items = [
    {
      title: 'Industry Project',
      description: 'Immerse learners in real-world projects across multiple industries. Increase skills through reflections and a critical thinking framework.',
      icon: 'fa-building',
      tags: [],
      navigate: ['onboarding', 'details', 'industryProject']
    },
    {
      title: 'Internship',
      description: `Work experience guided by experts. Develop and refine skills, explore career path, gain confidence and improve learner's resume.`,
      icon: 'fa-user-astronaut',
      tags: [],
      navigate: ['onboarding', 'details', 'internship']
    },
    {
      title: 'Work Simulation',
      description: 'Execute real-world simulations to immerse candidates in real scenarios. Useful experience for hiring or promotions processes.',
      icon: 'fa-briefcase',
      tags: [],
      navigate: ['onboarding', 'details', 'workSimulation']
    },
    {
      title: 'Mentoring',
      description: 'Tap into the existing knowledge, skills, and experience of senior or high performing employees and transfer these skills to newer or less experienced employees.',
      icon: 'fa-hands-helping',
      tags: [],
      navigate: ['onboarding', 'details', 'mentoring']
    },
    {
      title: 'Accelerator',
      description: 'Help learners or funders to find their product-market fit and scale their ventures. Simulate pitchs, investors meetings and networking skills.',
      icon: 'fa-rocket',
      tags: [],
      navigate: ['onboarding', 'details', 'accelerator']
    }
  ];

  constructor(
    public router: Router
  ) {}

  navigate(i: number) {
    this.router.navigate(this.items[i].navigate);
  }
}
