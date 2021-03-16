import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverviewService } from '../../../overview/overview.service';
import { UtilsService } from '@services/utils.service';

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
    public modalController: ModalController,
    private overviewService: OverviewService,
    private utils: UtilsService,
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
    this.utils.broadcastEvent('show-loading', { message: 'Duplicating the experience' });
    const roles = [];
    for (const role in this.roleSelected) {
      if (this.roleSelected[role]) {
        roles.push(role);
      }
    }
    this.overviewService.duplicateExperience(this.experienceUuid, roles).subscribe(res => {
      this.utils.broadcastEvent('exps-reload', {});
      this.utils.broadcastEvent('dismiss-loading', {});
    });
    this.modalController.dismiss();
  }

  cancel() {
    this.modalController.dismiss();
  }
}
