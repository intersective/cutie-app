import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  deletingTemplate = false;

  constructor(
    private route: ActivatedRoute,
    private service: TemplateLibraryService,
    private popupService: PopupService,
    private storage: StorageService,
    private router: Router,
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
      this.popupService.showImportExp({
        action: 'create',
        uuid: this.template.uuid,
        url: `${res}&appkey=${environment.appkey}&apikey=${apikey}`
      });
    });
  }

  deleteTemplate() {
    this.popupService.showAlert({
      message: 'Delete <strong>' + this.template.name + '</strong> experience template.<br/>This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: this.deleteTemplateConfirm.bind(this)
        },
      ]
    });
  }

  deleteTemplateConfirm() {
    this.popupService.showLoading({
      message: 'Deleting the template'
    });
    this.service.deleteTemplate(this.template.uuid).subscribe(res => {
      setTimeout(() => this.popupService.dismissLoading(), 500);
      if (res.success) {
        this.popupService.showToast('Success: "' + this.template.name + '" template deleted.', {color: 'success'});
        this.router.navigate(['/templates']);
      } else {
        this.popupService.showToast(res.message);
      }
    });
  }

  canDelete() {
    const myInfo = this.storage.getUser();
    if (myInfo && this.template) {
      return !this.template.isPublic && myInfo.role === 'inst_admin';
    }
    return false;
  }

}
