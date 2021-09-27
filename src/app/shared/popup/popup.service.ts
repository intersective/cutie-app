import { Injectable } from '@angular/core';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AlertOptions, ToastOptions, ModalOptions, LoadingOptions } from '@ionic/core';
import { UtilsService } from '@services/utils.service';
import { DescriptionComponent } from './description/description.component';
import { TagsComponent } from './tags/tags.component';
import { TagsViewComponent } from './tags-view/tags-view.component';
import { CreateExperienceComponent } from './create-experience/create-experience.component';
import { DuplicateExperienceComponent } from './duplicate-experience/duplicate-experience.component';
import { ImportExperienceComponent } from './import-experience/import-experience.component';
import { CreateTemplateComponent } from './create-template/create-template.component';

export interface CustomTostOptions {
  message: string;
  icon: string;
  duration?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  loading;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private utils: UtilsService,
  ) {
    this.utils.getEvent('show-loading').subscribe(event => {
      this.showLoading(event);
    });

    this.utils.getEvent('dismiss-loading').subscribe(event => {
      this.dismissLoading();
    });
  }

  dismiss() {
    return this.modalController.dismiss();
  }

  async showModal(component, componentProps, options?, event?): Promise<void> {
    const modal = await this.modalController.create({
      ...{ component, componentProps },
      ...options
    });

    if (event) {
      modal.onDidDismiss().then(event);
    }
    return modal.present();
  }

  async showAlert(config: AlertOptions) {
    const alert = await this.alertController.create(config);
    return alert.present();
  }

  // toast message pop up, by default, shown success message for 2 seconds.
  async showToast(message: string, options?: any) {
    let toastOptions: ToastOptions = {
      message: message,
      duration: 2000,
      position: 'top',
      color : 'danger'
    };
    toastOptions = Object.assign(toastOptions, options);
    const toast = await this.toastController.create(toastOptions);
    return toast.present();
  }

  async showLoading(opts?: LoadingOptions): Promise<void> {
    this.loading = await this.loadingController.create(opts);
    return this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

  /**
   * show description pop up message
   * this is using description.component.ts as the view
   * put redirect = null if don't need to redirect
   */
  showDescription(title, content, redirect: any = null) {
    const component = DescriptionComponent;
    const componentProps = {
      title,
      content,
      redirect,
    };
    const options = {
      cssClass: 'practera-popup'
    };
    return this.showModal(component, componentProps, options);
  }

  /**
   * show tags pop up message
   * this is using tags.component.ts as the view
   */
  showTags({ tags, type, data, title }) {
    const component = TagsComponent;
    const componentProps = {
      title,
      tags,
      type,
      data,
    };
    const options = {
      cssClass: 'practera-popup'
    };
    return this.showModal(component, componentProps, options);
  }

  /**
   * show tags pop up message
   * this is using tags.component.ts as the view
   */
  showTagsView({ tags, title }) {
    const component = TagsViewComponent;
    const componentProps = {
      title,
      tags,
    };
    const options = {
      cssClass: 'practera-popup'
    };
    return this.showModal(component, componentProps, options);
  }

  /**
   * show tags pop up message
   * this is using tags.component.ts as the view
   */
  showCreateExp() {
    const component = CreateExperienceComponent;
    const componentProps = {};
    const options = {
      cssClass: 'practera-popup'
    };
    return this.showModal(component, componentProps, options);
  }

  /**
   * show duplicate experience pop up message
   * this is using duplicate-experience.component.ts as the view
   */
  showDuplicateExp(experienceUuid: string) {
    const component = DuplicateExperienceComponent;
    const componentProps = {
      experienceUuid,
    };
    const options = {
      cssClass: 'practera-popup'
    };
    return this.showModal(component, componentProps, options);
  }

  /**
   * show import experience pop up message
   * this is using import-experience.component.ts as the view
   */
  showImportExp(url: string) {
    const component = ImportExperienceComponent;
    const componentProps = {
      url,
    };
    const options = {
      backdropDismiss: false,
      cssClass: 'practera-popup'
    };
    return this.showModal(component, componentProps, options);
  }

  /**
   * show create template pop up message
   * this is using create-template.component.ts as the view
   */
   showCreateTemplate(uuid: string, name: string) {
    const component = CreateTemplateComponent;
    const componentProps = { uuid, name };
    const options = {
      backdropDismiss: false,
      cssClass: 'practera-popup'
    };
    return this.showModal(component, componentProps, options);
  }

}
