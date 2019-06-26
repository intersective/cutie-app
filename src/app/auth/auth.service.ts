import { Injectable } from '@angular/core';
import { RequestService } from '@shared/request/request.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { StorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';


/**
 * list of api endpoint involved in this service
 */
const api = {
  login: 'api/auths.json',
  me: 'api/users.json',
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private request: RequestService,
    private storage: StorageService,
    private utils: UtilsService,
    private demo: DemoService
  ) { }

  /**
   * login API specifically only accept request data in encodedUrl formdata,
   * so must convert them into compatible formdata before submission
   */
  directLogin(token: string): Observable<any> {
    if (environment.demo) {
      const response = this.demo.directLogin();
      this._handleLoginResponse(response);
      return of(response).pipe(delay(2000));
    }
    const body = new HttpParams()
      .set('auth_token', token);
    return this.request.post(api.login, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).pipe(map(this._handleLoginResponse, this));
  }

  private _handleLoginResponse(response) {
    const data = response.data;
    if (data) {
      this.storage.setUser({
        apikey: data.apikey,
        timelineId: data.timeline_id ? data.timeline_id : null,
        programId: data.program_id ? data.program_id : null
      });
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
    this.getMyInfo().subscribe();
    return response;
  }

  /**
   * get user info
   */
  getMyInfo(): Observable<any> {
    if (environment.demo) {
      const response = this.demo.getMyInfo();
      this._handleMyInfo(response);
      return of(response);
    }
    return this.request.get(api.me).pipe(map(this._handleMyInfo, this));
  }

  private _handleMyInfo(response) {
    if (response.data) {
      if (!this.utils.has(response, 'data.User')) {
        return this.request.apiResponseFormatError('User format error');
      }
      const apiData = response.data.User;
      this.storage.setUser({
        name: apiData.name,
        contactNumber: apiData.contact_number,
        email: apiData.email,
        image: apiData.image,
        userHash: apiData.userhash
      });
    }
    return response;
  }
}
