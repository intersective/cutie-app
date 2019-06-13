import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { delay } from 'rxjs/internal/operators';
import { RequestService } from '@shared/request/request.service';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';

/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
const api = {
  get: {
    enrolments: 'enrolments',
  },
  post: {
  }
};

export interface Enrolment {
  name: string;
  email?: string;
  teamName?: string;
  userUid: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressTableService {

  constructor(
    private request: RequestService,
    private demo: DemoService
  ) { }

  getEnrolments(offset = 0, limit = 10, sort = null, filter = null) {
    if (environment.demo) {
      const response = this.demo.getEnrolments();
      return of(this._handleEnrolmentResponse(response)).pipe(delay(1000));
    }
    const params = {
      offset: offset,
      limit: limit,
      role: 'participant',
      fields: 'name,user_uid,team_name,participant_email',
      progress: true
    };
    if (sort) {
      params['sort'] = sort;
    }
    if (filter) {
      params['filter'] = filter;
    }
    return this.request.get(api.get.enrolments, {params: params})
      .pipe(map(this._handleEnrolmentResponse));
  }

  private _handleEnrolmentResponse(response) {
    const enrolments: Array<Enrolment> = [];
    response.data.forEach(enrolment => {
      enrolments.push({
        name: enrolment.name,
        email: enrolment.participant_email,
        teamName: enrolment.team_name,
        userUid: enrolment.user_uid,
        image: enrolment.image ? enrolment.image : ''
      });
    });
    return {
      data: enrolments,
      total: response.total
    };
  }
}
