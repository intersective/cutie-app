import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    public utils: UtilsService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectIcon = this.storage.get('selectedProjectIcon');
      this.onboardingData = this.storage.getOnboardingData();
      if (!this.onboardingData.template || !this.onboardingData.template.uuid || !this.onboardingData.template.duration) {
        return this.router.navigate(['onboarding']);
      }
      this.steps = +params.steps;
      this.templateType = params.templateType;
    });
  }

  ngAfterViewInit() {
    this.utils.createHubSpotForm({
      formId: environment.onboarding.finalFormId,
      category: `OBG - ${ this.onboardingData.expType } - Create`
    }, [{
      name: environment.onboarding.finalFormHiddenFieldName,
      value: this.getFormatedOnboardingData()
    }]);
  }

  get experienceName() {
    let name = 'Experience';
    if (this.onboardingData && this.onboardingData.template.name) {
      name = this.onboardingData.template.name;
    }
    return name;
  }

  getFormatedOnboardingData() {
    let dataString = '';
    if (this.onboardingData['expType']) {
      dataString += `expType - ${this.onboardingData['expType']} \n`;
    }
    if (this.onboardingData['qna']) {
      dataString += `qna - \n`;
      const qna = this.onboardingData['qna'];
      qna.forEach(q => {
        dataString += `question : ${q.question} \n`;
        dataString += `answer : ${q.answer} \n`;
      });
    }
    if (this.onboardingData['template']) {
      dataString += `template - \n`;
      dataString += `uuid : ${this.onboardingData['template'].uuid} \n`;
      dataString += `name : ${this.onboardingData['template'].name} \n`;
      dataString += `duration : ${this.onboardingData['template'].duration} \n`;
    }
    if (this.onboardingData['briefs']) {
      dataString += `briefs - \n`;
      const briefs = this.onboardingData['briefs'];
      briefs.forEach(brief => {
        dataString += `uuid : ${brief.uuid} \n`;
        dataString += `name : ${brief.name} \n`;
      });
    }
    return dataString;
  }

}
