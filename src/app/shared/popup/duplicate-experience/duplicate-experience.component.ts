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
    author: false,
    coordinator: false,
    expert: false,
    learner: false,
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
          author: false,
          coordinator: false,
          expert: false,
          learner: false,
        };
        this.allSelected = false;
      } else {
        this.roleSelected = {
          author: true,
          coordinator: true,
          expert: true,
          learner: true,
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
    return this.roleSelected.author &&
      this.roleSelected.coordinator &&
      this.roleSelected.expert &&
      this.roleSelected.learner;
  }

  confirmed() {
    const roles = this.getRolesForAPI();
    this.modalController.dismiss();
    this.overviewService.duplicateExperienceUrl(this.experienceUuid, roles).subscribe(res => {
      if (!res) {
        return;
      }
      this.utils.broadcastEvent('duplicate-exp', {
        uuid: this.experienceUuid,
        url: res
      });
    });
  }

  getRolesForAPI () {
    const roles = [];
    for (const role in this.roleSelected) {
      if (this.roleSelected[role]) {
        switch (role) {
          case 'author':
            roles.push('admin');
          break;
          case 'expert':
            roles.push('mentor');
          break;
          case 'learner':
            roles.push('participant');
          break;
          default:
            roles.push(role);
          break;
        }
      }
    }
    return roles;
  }

  cancel() {
    this.modalController.dismiss();
  }
}
