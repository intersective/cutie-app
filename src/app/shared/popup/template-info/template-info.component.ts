import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnboardingService, Template } from '@app/onboarding/onboarding.service';
import { Router } from '@angular/router';
import { StorageService } from '@app/shared/services/storage.service';

import { UtilsService } from '@services/utils.service';
import { AnalyticsService } from '@app/shared/services/analytics.service';

@Component({
  selector: 'app-template-info',
  templateUrl: 'template-info.component.html',
  styleUrls: ['template-info.component.scss']
})

export class TemplateInfoComponent implements OnInit {
  uuid: string;
  title: string;
  template: Template;
  durationIndex = 0;

  constructor(
    private modalController: ModalController,
    private service: OnboardingService,
    private router: Router,
    public utils: UtilsService,
    private storage: StorageService,
    private analytics: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.template = null;
    this.service.getTemplateDetail({ uuid: this.uuid }).subscribe(res => {
      this.template = res;
    });
  }

  confirm() {
    const selectedTemplate = {
      uuid: this.uuid,
      name: this.title,
      duration: this.template.projects[this.durationIndex].duration,
    };
    this.analytics.track('[Onboarding] Template selected', selectedTemplate);
    this.storage.setOnboardingData({
      template: selectedTemplate
    });
    this.modalController.dismiss();
    this.router.navigate(['onboarding', 'pre-brief']);
  }

  cancel() {
    return this.modalController.dismiss();
  }
}
