import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Template, TemplateLibraryService } from '../template-library.service';
import { PopupService } from '../../shared/popup/popup.service';
import { StorageService } from '@services/storage.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent {

  template: Template;
  loadingTemplate = true;
  importingTemplate = false;
  categoryLeadImage = '/assets/exp-placeholder.png';

  constructor(
    private route: ActivatedRoute,
    private service: TemplateLibraryService,
    private popupService: PopupService,
    private storage: StorageService,
  ) {
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

      this.service.getCategories().forEach(category => {
        if (category.id === res.type) {
          this.categoryLeadImage = category.leadImage;
        }
      });

      this.loadingTemplate = false;
    });
  }

  importTemplate(templateId: string) {
    this.importingTemplate = true;
    this.service.importExperienceUrl(templateId).subscribe(res => {
      if (!res) {
        return;
      }
      this.importingTemplate = false;
      const apikey = this.storage.getUser().apikey;
      if (!apikey) {
        this.popupService.showToast('Failed to create the experience!');
        return;
      }
      this.popupService.showImportExp(`${res}&appkey=${environment.appkey}&apikey=${apikey}`);
    });
  }


}
