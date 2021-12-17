import { Component, OnInit } from '@angular/core';
import { OnboardingService, Template } from '../onboarding.service';
import { PopupService } from '@shared/popup/popup.service';
import { UtilsService } from '@services/utils.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {
  templates: [Template];
  projectIcon: string;
  constructor(
    private service: OnboardingService,
    private popupService: PopupService,
    public utils: UtilsService,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.projectIcon = this.storage.get('selectedProjectIcon');
    this.service.getTemplates().subscribe(res => {
      this.templates = res;
    });
  }

  customExperience() {
    console.log('custom exp');
  }

  templateDetail(uuid: string, title: string) {
    this.popupService.showTemplateInfo(uuid, title);
  }
}
