import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-experience',
  templateUrl: 'create-experience.component.html',
  styleUrls: ['create-experience.component.scss']
})
export class CreateExperienceComponent {

  constructor(
    public modalController: ModalController,
    private router: Router
  ) {}

  browse() {
    this.modalController.dismiss();
    this.router.navigate(['/templates']);
  }
}
