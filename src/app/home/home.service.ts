import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from '@shared/request/request.service';

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
  uid: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private request: RequestService,
  ) { }

  getEnrolments(offset = 0, limit = 10) {
    return this.request.get(api.get.enrolments, {params: {
        offset: offset,
        limit: limit,
        role: 'participant',
        fields: 'name'
      }})
      .pipe(map(response => {
        return response;
      })
    );
  }
}
