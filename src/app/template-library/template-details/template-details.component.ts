import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Template, TemplateLibraryService} from '../template-library.service';
import { environment } from '@environments/environment';
import { urlFormatter } from '../../../helper';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent implements OnInit {

  template: Template;
  loadingTemplate = true;
  importingTemplate = false;

  constructor(private route: ActivatedRoute,
              private service: TemplateLibraryService,
              private popupService: PopupService) {
    this.route.params.subscribe(params => {
      this.fetchTemplate(params.templateId);
    });
  }

  fetchTemplate(templateId: string) {
    this.loadingTemplate = true;
    this.service.getTemplate(templateId).subscribe(res => {
      if (res === null) {
        return;
      }
      this.template = res;
      this.loadingTemplate = false;
    });
  }

  importTemplate(templateId: string) {
    this.importingTemplate = true;
    this.service.importExperience(templateId).subscribe(res => {
      this.importingTemplate = false;
      if (res && res.experienceUuid) {
        window.top.location.href = urlFormatter(environment.Practera, `/users/change/experience/${res.experienceUuid}?redirect=/design`);
      } else {
        this.popupService.showToast('Failed to import the experience!');
      }
    });
  }

  ngOnInit() {}

}
