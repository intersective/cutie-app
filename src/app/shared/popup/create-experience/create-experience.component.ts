import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-experience',
  templateUrl: 'create-experience.component.html',
  styleUrls: ['create-experience.component.scss']
})
export class CreateExperienceComponent {

  constructor(
    public modalController: ModalController
  ) {}

  browse() {
    this.modalController.dismiss();
    console.log('navigate to catalog');
    // this.router.navigate([]);
  }
}
