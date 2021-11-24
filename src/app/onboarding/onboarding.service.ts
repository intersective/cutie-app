import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';
import { RequestService } from '../shared/request/request.service';
import { Observable } from 'rxjs/Observable';
import { urlFormatter } from 'helper';

export interface Template {
  uuid: string;
  name: string;
  abstract: string;
  leadImageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private demo: DemoService) { }

  getTemplates(): Observable<[Template]> {
    if (environment.demo) {
      return this.demo.getOnboardingTemplates().pipe(map(this._handleOnBoardingTemplates));
    }
  }

  private _handleOnBoardingTemplates(res) {
    if (!res || !res.data || !res.data.onboardingTemplates) {
      return [];
    }
    return res.data.onboardingTemplates;
  }
}
