import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {Template, TemplateLibraryService} from '../../../template-library/template-library.service';
import {OverviewService} from '../../../overview/overview.service';
import {Router} from '@angular/router';
import {ToastOptions} from '@ionic/core';

@Component({
  selector: 'app-delete-template',
  templateUrl: './delete-template.component.html',
  styleUrls: ['./delete-template.component.scss'],
})
export class DeleteTemplateComponent implements OnInit {
  template: Template;
  isDeleting = false;

  constructor(
    public modalController: ModalController,
    private templateLibraryService: TemplateLibraryService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
  }

  confirmed() {
    this.isDeleting = true;
    this.templateLibraryService.deleteTemplate(this.template.uuid).subscribe(res => {
      this.modalController.dismiss();
      if (res.success) {
        this.showToast('Success: "' + this.template.name + '" template deleted.', res.success);
        this.router.navigate(['/templates']);
      } else {
        this.showToast(res.message, res.success);
      }
    });
  }

  cancel() {
    this.modalController.dismiss();
  }

  async showToast(message: string, success: boolean) {
    const toastOptions: ToastOptions = {
      message: message,
      duration: 2000,
      position: 'top',
      color: success ? 'success' : 'danger'
    };
    const toast = await this.toastController.create(toastOptions);
    console.log(toast);
    return toast.present();
  }

}
