import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '@app/shared/services/utils.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit, AfterViewInit {
  steps: number;
  templateType: string;
  constructor(
    private route: ActivatedRoute,
    private utils: UtilsService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.steps = +params.steps;
      this.templateType = params.templateType;
    });
  }

  ngAfterViewInit() {
    this.utils.createHubSpotForm({
      formId: environment.onboarding.finalFormId
    });
  }

}
