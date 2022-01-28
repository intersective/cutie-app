import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '@app/shared/popup/popup.service';
import { AnalyticsService } from '@app/shared/services/analytics.service';
import { StorageService } from '@app/shared/services/storage.service';

@Component({
  selector: 'app-type-of-experience',
  templateUrl: './type-of-experience.page.html',
  styleUrls: ['./type-of-experience.page.scss'],
})
export class TypeOfExperiencePage implements OnInit {

  items = [
    {
      title: 'Industry Project',
      description: 'Immerse learners in real-world projects across multiple industries. Increase skills through reflections and a critical thinking framework.',
      icon: 'fa-building',
      tags: ['Team Based'],
      navigate: ['onboarding', 'details', 'industryProject']
    },
    {
      title: 'Internship',
      description: `Work experience guided by experts. Develop and refine skills, explore career path, gain confidence and improve learner's resume.`,
      icon: 'fa-user-astronaut',
      tags: ['Individual'],
      navigate: ['onboarding', 'details', 'internship']
    },
    {
      title: 'Work Simulation',
      description: 'Execute real-world simulations to immerse candidates in real scenarios. Useful experience for hiring or promotions processes.',
      icon: 'fa-briefcase',
      tags: ['Individual', 'Team Based'],
      navigate: ['onboarding', 'details', 'workSimulation']
    },
    {
      title: 'Mentoring',
      description: 'Tap into the existing knowledge, skills, and experience of senior or high performing employees and transfer these skills to newer or less experienced employees.',
      icon: 'fa-hands-helping',
      tags: ['Individual', 'Team Based'],
      navigate: ['onboarding', 'details', 'mentoring']
    },
    {
      title: 'Accelerator',
      description: 'Help learners or funders to find their product-market fit and scale their ventures. Simulate pitchs, investors meetings and networking skills.',
      icon: 'fa-rocket',
      tags: ['Team Based'],
      navigate: ['onboarding', 'details', 'accelerator']
    }
  ];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
    private analytics: AnalyticsService,
    private popupService: PopupService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.storage.clearOnboardingData();
    });
  }

  navigate(i: number) {
    this.analytics.track('Click', {
      category: 'OBG - Experience Type Selection',
      label: this.items[i].title
    });
    this.storage.setOnboardingData({ expType: this.items[i].title });
    this.router.navigate(this.items[i].navigate);
  }

  other() {
    this.analytics.track('Click', {
      category: 'OBG - Experience Type Selection',
      label: 'Other'
    });
    this.popupService.showOnboardingPopup('other');
  }
}
