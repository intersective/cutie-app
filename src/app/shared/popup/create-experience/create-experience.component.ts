import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-experience',
  templateUrl: 'create-experience.component.html',
  styleUrls: ['create-experience.component.scss']
})
export class CreateExperienceComponent {

  constructor(
    private router: Router,
    public modalController: ModalController
  ) {}

  browse() {
    this.modalController.dismiss();
    console.log('navigate to catalog');
    //this.router.navigate([]);
  }
}
