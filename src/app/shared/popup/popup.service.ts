import { Injectable } from '@angular/core';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AlertOptions, ToastOptions, ModalOptions, LoadingOptions } from '@ionic/core';
import { DescriptionComponent } from './description/description.component';
import { TagsComponent } from './tags/tags.component';

export interface CustomTostOptions {
  message: string;
  icon: string;
  duration?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) {}

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
    const loading = await this.loadingController.create(opts || {
      spinner: 'dots',

    });
    return loading.present();
  }

  /**
   * show description pop up message
   * this is using description.component.ts as the view
   * put redirect = false if don't need to redirect
   */
  showDescription(title, content, redirect: any = false) {
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

}
