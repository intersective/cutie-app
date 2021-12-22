import { Component, OnInit } from '@angular/core';
import { OnboardingService, Template } from '../onboarding.service';
import { PopupService } from '@shared/popup/popup.service';
import { UtilsService } from '@services/utils.service';
import { StorageService } from '@services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {
  templates: [Template];
  projectIcon: string;
  loading: boolean;
  selectedTopic: string;
  constructor(
    private service: OnboardingService,
    private popupService: PopupService,
    public utils: UtilsService,
    public storage: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.projectIcon = this.storage.get('selectedProjectIcon');
    const onboardingData = this.storage.getOnboardingData();
    if (!onboardingData || !onboardingData.qna || !onboardingData.qna[1].answer) {
      this.router.navigate(['onboarding']);
    }
    const attribute = onboardingData.qna[1].answer.toLowerCase();
    this.selectedTopic = attribute;
    this.loading = true;
    this.service.getTemplates(attribute).subscribe(res => {
      if (res === null) {
        return null;
      }
      this.templates = res;
      this.loading = false;
    });
  }

  customExperience() {
    console.log('custom exp');
  }

  templateDetail(uuid: string, title: string) {
    this.popupService.showTemplateInfo(uuid, title);
  }
}
