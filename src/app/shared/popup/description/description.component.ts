import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-description',
  templateUrl: 'description.component.html',
  styleUrls: ['description.component.scss']
})
export class DescriptionComponent {
  title = '';
  content = '';
  redirect = ['/'];

  constructor(
    private router: Router,
    public modalController: ModalController
  ) {}

  confirmed() {
    this.modalController.dismiss();
    // if this.redirect == null, don't redirect to another page
    if (this.redirect) {
      this.router.navigate(this.redirect);
    }
  }
}
