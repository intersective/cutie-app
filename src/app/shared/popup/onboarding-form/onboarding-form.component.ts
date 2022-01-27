import { AfterViewInit, Component } from '@angular/core';
import { StorageService } from '@app/shared/services/storage.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { environment } from '@environments/environment';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-onboarding-form',
  templateUrl: 'onboarding-form.component.html',
  styleUrls: ['onboarding-form.component.scss']
})
export class OnboardingFormComponent implements AfterViewInit {
  title: string;
  description: string;

  constructor(
    public modalController: ModalController,
    private utils: UtilsService,
    private storage: StorageService
  ) {}

  ngAfterViewInit() {
    this.utils.createHubSpotForm({
      formId: environment.onboarding.popupFormId,
      category: `OBG - ${ this.storage.getOnboardingData().expType } - Request`
    });
  }

  cancel() {
    this.modalController.dismiss();
  }

}
