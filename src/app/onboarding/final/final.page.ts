import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '@app/shared/services/utils.service';
import { StorageService } from '@app/shared/services/storage.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit, AfterViewInit {
  steps: number;
  templateType: string;
  projectIcon: string;
  onboardingData;

  constructor(
    private route: ActivatedRoute,
    public utils: UtilsService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    this.projectIcon = this.storage.get('selectedProjectIcon');
    this.onboardingData = this.storage.getOnboardingData();
    this.route.params.subscribe(params => {
      this.steps = +params.steps;
      this.templateType = params.templateType;
    });
  }

  ngAfterViewInit() {
    this.utils.createHubSpotForm({
      formId: environment.onboarding.finalFormId
    }, [{
      name: 'content',
      value: this.onboardingData
    }]);
  }

}
