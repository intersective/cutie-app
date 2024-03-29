import { Injectable } from '@angular/core';
import { RequestService } from '@shared/request/request.service';
import { ApolloService } from '@shared/apollo/apollo.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs';
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
    private apollo: ApolloService,
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
      return this.demo.directLogin().pipe(map(this._handleLoginResponse, this));
    }
    this.logout();
    const body = new HttpParams()
      .set('auth_token', token);
    return this.request.post(api.login, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).pipe(map(this._handleLoginResponse, this));
  }

  /**
   * login API specifically only accept request data in encodedUrl formdata,
   * so must convert them into compatible formdata before submission
   */
  jwtLogin(jwt: string): Observable<any> {
    if (environment.demo) {
      const response = this.demo.directLogin();
      this._handleLoginResponse(response);
      return of(response).pipe(delay(2000));
    }
    this.logout();
    const body = new HttpParams()
      .set('apikey', jwt);
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
        timelineUuid: data.timeline_uuid ? data.timeline_uuid : null,
        programId: data.program_id ? data.program_id : null
      });
      const programs = data.Timelines ? data.Timelines.map(function(timeline) {
        return {
          enrolment: timeline.Enrolment,
          program: timeline.Program,
          project: timeline.Project,
          timeline: timeline.Timeline
        };
      }) : [];
      this.storage.set('programs', programs);
    }
    this.getMyInfo().subscribe();
    this.getMyInfoGraphQL().subscribe();
    if (data.timeline_id || data.timeline_uuid) {
      this.getUserEnrolmentUuid().subscribe();
    }
    return response;
  }

  /**
   * get user info
   */
  getMyInfo(): Observable<any> {
    if (environment.demo) {
      return this.demo.getMyInfo().pipe(map(this._handleMyInfo, this));
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
        contactNumber: apiData.contact_number,
        userHash: apiData.userhash,
      });
    }
    return response;
  }

  getMyInfoGraphQL(): Observable<any> {
    if (environment.demo) {
      return this.demo.getMyInfoGraphQL().pipe(map(this._handleMyInfoGraphQL, this));
    }
    return this.apollo.graphQLFetch(
      `query user {
        user {
          uuid
          name
          email
          image
          role
          institution {
            uuid
            name
          }
        }
      }`
    ).pipe(map(this._handleMyInfoGraphQL, this));
  }

  private _handleMyInfoGraphQL(res) {
    if (!res || !res.data) {
      return null;
    }
    this.storage.setUser({
      uuid: res.data.user.uuid,
      name: res.data.user.name,
      email: res.data.user.email,
      image: res.data.user.image,
      role: res.data.user.role,
      institutionUuid: res.data.user.institution.uuid,
      institutionName: res.data.user.institution.name,
    });
    return res.data.user;
  }

  getUserEnrolmentUuid(): Observable<any> {
    if (environment.demo) {
      const response = this.demo.getCurrentUser();
      return of(this._normaliseGetUserEnrolmentUuidResponse(response.data)).pipe(delay(1000));
    }
    return this.apollo.graphQLFetch(
      `query user {
        user {
          enrolmentUuid
        }
      }`,
      {}
    ).pipe(
      map(response => {
        if (response.data) {
          return this._normaliseGetUserEnrolmentUuidResponse(response.data);
        }
      })
    );
  }

  private _normaliseGetUserEnrolmentUuidResponse(data) {
    const result = JSON.parse(JSON.stringify(data.user));
    if (!this.utils.has(result, 'enrolmentUuid')) {
      this.request.apiResponseFormatError('current user enrolment uuid format error');
      return null;
    }
    this.storage.setUser({
      enrolmentUuid: result.enrolmentUuid
    });
    return result;
  }

  logout() {
    this.storage.clear();
  }

}
