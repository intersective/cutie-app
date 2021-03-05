import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tags-view',
  templateUrl: 'tags-view.component.html',
  styleUrls: ['tags-view.component.scss']
})
export class TagsViewComponent {
  title = '';
  tags: string[];

  constructor(
    public modalController: ModalController
  ) {}

  confirmed() {
    this.modalController.dismiss();
  }

}
