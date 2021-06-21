import { Component, OnInit } from '@angular/core';
import { urlFormatter } from 'helper';
import { ModalController, ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-import-experience',
  templateUrl: 'import-experience.component.html',
  styleUrls: ['import-experience.component.scss']
})
export class ImportExperienceComponent implements OnInit {
  url: string;
  progress = 0;
  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    if (this.url) {
      const eventSource = new EventSource(this.url);
      eventSource.onopen = () => { console.log('connection open') };
      eventSource.onmessage = (message) => {
        console.log(message, typeof message.data);
        if (message.data.progress) {
          this.progress = message.data.progress;
        }
        if (message.data.experienceUuid) {
          eventSource.close();
          window.top.location.href = urlFormatter(environment.Practera, `/users/change/experience/${message.data.experienceUuid}?redirect=/design`);
        }
      }
      eventSource.onerror = () => {
        console.error('connection failed');
        this.showToast('Failed to use this experience, please try again later.')
        this.modalController.dismiss();
      };
    }
  }

  // toast message pop up, by default, shown success message for 2 seconds.
  async showToast(message: string, options?: any) {
    let toastOptions: ToastOptions = {
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    };
    toastOptions = Object.assign(toastOptions, options);
    const toast = await this.toastController.create(toastOptions);
    return toast.present();
  }
}
