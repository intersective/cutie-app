import { Injectable } from '@angular/core';
import { RequestService } from '@shared/request/request.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { StorageService } from '@services/storage.service';

/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
const api = {
  login: 'api/auths.json',
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private request: RequestService,
    private storage: StorageService
  ) { }

  /**
   * @name directLogin
   * @description login API specifically only accept request data in encodedUrl formdata,
   *              so must convert them into compatible formdata before submission
   */
  directLogin(token: string): Observable<any> {
    const body = new HttpParams()
      .set('auth_token', token);
    return this.request.post(api.login, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).pipe(map(this._handleLoginResponse, this));
  }

  private _handleLoginResponse(response) {
    const data = response.data;
    if (data) {
      this.storage.setUser({apikey: data.apikey});
      const programs = data.Timelines.map(function(timeline) {
        return {
          enrolment: timeline.Enrolment,
          program: timeline.Program,
          project: timeline.Project,
          timeline: timeline.Timeline
        };
      });
      this.storage.set('programs', programs);
    }
    return response;
  }

}
