import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Brief } from '@app/onboarding/onboarding.service';
import { UtilsService } from '@app/shared/services/utils.service';

@Component({
  selector: 'app-brief-info',
  templateUrl: 'brief-info.component.html',
  styleUrls: ['brief-info.component.scss']
})

export class BriefInfoComponent {
  brief: Brief;

  constructor(
    private modalController: ModalController,
    private utils: UtilsService
  ) { }


  confirm() {
    this.utils.broadcastEvent('select-brief', this.brief.uuid);
    return this.modalController.dismiss();
  }

  cancel() {
    return this.modalController.dismiss();
  }
}
