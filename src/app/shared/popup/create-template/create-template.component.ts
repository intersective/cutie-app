import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverviewService } from '@app/overview/overview.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-template',
  templateUrl: 'create-template.component.html',
  styleUrls: ['create-template.component.scss']
})

export class CreateTemplateComponent {
  name: string;
  uuid: string;
  creating = false;
  constructor(
    private modalController: ModalController,
    private service: OverviewService,
    private router: Router
  ) { }

  confirm() {
    this.creating = true;
    this.service.exportExperience(this.uuid, this.name).subscribe(res => {
      if (!res) {
        return;
      }
      this.creating = false;
      this.modalController.dismiss();
      this.router.navigate(['templates', 'view', res.uuid]);
    });
  }

  cancel() {
    return this.modalController.dismiss();
  }
}
