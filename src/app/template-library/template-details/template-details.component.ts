import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Template, TemplateLibraryService } from '../template-library.service';
import { PopupService } from '../../shared/popup/popup.service';
import { StorageService } from '@services/storage.service';
import { environment } from '@environments/environment';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/services/storage.service';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent implements OnInit {

  template: Template;
  loadingTemplate = true;
  importingTemplate = false;
  categoryLeadImage = '/assets/exp-placeholder.png';
  deletingTemplate = false;
  myInfo: User;

  constructor(
    private route: ActivatedRoute,
    private service: TemplateLibraryService,
    private popupService: PopupService,
    private storage: StorageService,
    private authService: AuthService
  ) {
    this.route.params.subscribe(params => {
      this.fetchTemplate(params.templateId);
    });
  }

  ngOnInit() {
    this.authService.getMyInfoGraphQL().subscribe(myInfo => {
      this.myInfo = myInfo;
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

  deleteTemplate() {
    this.popupService.showDeleteTemplate(this.template);
  }

  canDelete() {
    if (this.myInfo && this.template) {
      return !this.template.isPublic && this.myInfo.role === 'inst_admin';
    }
    return false;
  }

}
