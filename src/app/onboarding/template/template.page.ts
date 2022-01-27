import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnboardingService, Template } from '../onboarding.service';

import { StorageService } from '@services/storage.service';
import { AnalyticsService } from '@app/shared/services/analytics.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {
  type: string;
  template: Template;
  durationIndex = 0;
  projectIcon: string;

  constructor(
    private service: OnboardingService,
    private router: Router,
    private route: ActivatedRoute,
    public storage: StorageService,
    private analytics: AnalyticsService
  ) { }

  ngOnInit() {
    this.projectIcon = this.storage.get('selectedProjectIcon');
    this.route.params.subscribe(params => {
      this.template = null;
      this.type = params.type;
      this.service.getTemplateDetail({ type: params.type }).subscribe(res => {
        this.template = res;
      });
    });
  }

  continue() {
    const selectedTemplate = {
      uuid: this.template.uuid,
      name: this.template.name,
      duration: this.template.projects[this.durationIndex].duration,
    };
    this.analytics.track('Select', {
      category: `OBG - ${ this.type } - Learning Design`,
      label: selectedTemplate.duration
    });
    this.storage.setOnboardingData({
      template: selectedTemplate
    });
    this.router.navigate(['onboarding', 'final', 3, { templateType: this.type }]);
  }

}
