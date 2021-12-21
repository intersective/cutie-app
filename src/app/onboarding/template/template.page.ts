import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnboardingService, Template } from '../onboarding.service';

import { StorageService } from '@services/storage.service';

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
    public storage: StorageService
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
    // @TODO save user's choice in local storage
    this.router.navigate(['onboarding', 'final', 3, { templateType: this.type }]);
  }

}
