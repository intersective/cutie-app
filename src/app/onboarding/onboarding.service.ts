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
  description?: string;
  level?: string;
  time?: string;
  projects?: [{
    duration: string;
    activities: [{
      name: string;
      tasks: [{
        name: string;
        type: string;
      }]
    }],
    briefsCount?: number;
  }];
}

export interface Brief {
  uuid: string;
  name: string;
  industry: string;
  abstract: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
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

  getTemplateDetail(uuid: string): Observable<Template> {
    if (environment.demo) {
      return this.demo.getOnboardingTemplateDetail().pipe(map(this._handleOnBoardingTemplate));
    }
  }

  private _handleOnBoardingTemplate(res) {
    if (!res || !res.data || !res.data.onboardingTemplate) {
      return null;
    }
    return res.data.onboardingTemplate;
  }

  getBriefs(templateUuid: string, duration: string): Observable<[Brief]> {
    if (environment.demo) {
      return this.demo.getOnboardingBriefs().pipe(map(this._handleBriefs));
    }
  }

  private _handleBriefs(res) {
    if (!res || !res.data || !res.data.onboardingBriefs) {
      return [];
    }
    return res.data.onboardingBriefs;
  }
}
