import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-duplicate-experience',
  templateUrl: 'duplicate-experience.component.html',
  styleUrls: ['duplicate-experience.component.scss']
})
export class DuplicateExperienceComponent {
  experienceUuid: string;
  roleSelected = {
    admin: false,
    coordinator: false,
    mentor: false,
    participant: false,
  };
  allSelected: boolean;

  constructor(
    public modalController: ModalController
  ) {}

  select(role?) {
    if (role) {
      if (this._allSelected()) {
        this.roleSelected = {
          admin: false,
          coordinator: false,
          mentor: false,
          participant: false,
        };
        this.allSelected = false;
      } else {
        this.roleSelected = {
          admin: true,
          coordinator: true,
          mentor: true,
          participant: true,
        };
        this.allSelected = true;
      }
      return ;
    }
    if (this._allSelected()) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }

  }

  private _allSelected() {
    return this.roleSelected.admin &&
      this.roleSelected.coordinator &&
      this.roleSelected.mentor &&
      this.roleSelected.participant;
  }

  confirmed() {
    console.log('uuid:', this.experienceUuid, 'roles: ', this.roleSelected);
    this.modalController.dismiss();
  }

  cancel() {
    this.modalController.dismiss();
  }
}
