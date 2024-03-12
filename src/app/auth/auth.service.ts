import { Injectable } from '@angular/core';
import { RequestService } from '@shared/request/request.service';
import { ApolloService } from '@shared/apollo/apollo.service';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { StorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';
import { PusherService } from '@shared/pusher/pusher.service';


/**
 * list of api endpoint involved in this service
 */
const api = {
  login: 'api/auths.json',
  me: 'api/users.json',
};

interface AuthEndpoint {
  data: {
    auth: {
      apikey: string;
      experience: object;
      email?: string;
      unregistered?: boolean;
      activationCode?: string;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private request: RequestService,
    private apollo: ApolloService,
    private storage: StorageService,
    private utils: UtilsService,
    private demo: DemoService,
    private pusherService: PusherService
  ) { }

  authenticate(data: {
    authToken?: string;
    apikey?: string;
    service?: string;
    // needed when switching program (inform server the latest selected experience)
    experienceUuid?: string;
  }): Observable<AuthEndpoint> {
    const options: {
      variables?: {
        authToken?: string;
        experienceUuid?: string;
      };
      context?: {
        headers?: {
          service?: string;
          apikey?: string;
        };
      };
    } = {};

    // Initialize options.variables
    if (data.authToken || data.experienceUuid) {
      options.variables = {};
    }

    if (data.authToken) {
      options.variables.authToken = data.authToken;
    }

    if (data.experienceUuid) {
      options.variables.experienceUuid = data.experienceUuid;
    }

    // Initialize options.headers
    if (data.apikey || data.service) {
      options.context = { headers: {} };
    }

    if (data.apikey) {
      this.storage.setUser({ apikey: data.apikey });
      options.context.headers.apikey = data.apikey;
    }

    if (data.service) {
      options.context.headers.service = data.service;
    }

    return this.apollo.graphQLFetch(`
      query auth($authToken: String, $experienceUuid: ID) {
        auth(authToken: $authToken, experienceUuid: $experienceUuid) {
          apikey
          experience {
            id
            uuid
            timelineId
            projectId
            name
            description
            type
            leadImage
            status
            setupStep
            color
            secondaryColor
            role
            isLast
            locale
            supportName
            supportEmail
            cardUrl
            bannerUrl
            logoUrl
            iconUrl
            reviewRating
            truncateDescription
          }
          email
          unregistered
          activationCode
        }
      }`,
      options
    ).pipe(
      map((res: AuthEndpoint)=> {
        if (res?.data?.auth?.unregistered === true) {
          // [CORE-6011] trusting API returns email and activationCode
          const { email, activationCode } = res.data.auth;
          throw {
            data: {
              user: {
                email,
                key: activationCode
              },
              message: 'User is not registered'
            },
            status: 'forbidden',
          };
        }
        return res;
      }),
      catchError(err => {
        // When logout get call from here user get redirect without showing any error messages.
        // so from here need to throw the error. and handel from the components.
        // then we can show error message and add logout as call back of notification popup.
        // Kepping this in case some error happen. logic moved
        //this.logout(); // clear user's information
        return throwError(err);
      }),
    );
  }

  autologin(data: {
    authToken?: string;
    apikey?: string;
    service?: string;
  }): Observable<any> {
    this.logout();
    return this.authenticate({...data, ...{service: 'LOGIN'}}).pipe(
      map(res => this._handleAuthResponse(res)),
    );
  }

  private _handleAuthResponse(res): {
    apikey?: string;
    experience?: object;
  } {
    const data: {
      apikey: string;
      experience: object;
    } = res.data.auth;

    this.storage.setUser({ apikey: data.apikey });
    this.storage.set('experience', data.experience);
    this.storage.set('isLoggedIn', true);
    this.getMyInfo().subscribe();
    return data;
  }

  /**
   * login API specifically only accept request data in encodedUrl formdata,
   * so must convert them into compatible formdata before submission
   */
  directLogin(token: string): Observable<any> {
    return this.autologin({ authToken: token });
    // if (environment.demo) {
    //   return this.demo.directLogin().pipe(map(this._handleLoginResponse, this));
    // }
    // this.logout();
    // const body = new HttpParams()
    //   .set('auth_token', token);
    // return this.request.post(api.login, body.toString(), {
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //   }).pipe(map(this._handleLoginResponse, this));
  }

  /**
   * login API specifically only accept request data in encodedUrl formdata,
   * so must convert them into compatible formdata before submission
   */
  jwtLogin(jwt: string): Observable<any> {
    return this.autologin({ apikey: jwt });
    // if (environment.demo) {
    //   const response = this.demo.directLogin();
    //   this._handleLoginResponse(response);
    //   return of(response).pipe(delay(2000));
    // }
    // this.logout();
    // const body = new HttpParams()
    //   .set('apikey', jwt);
    // return this.request.post(api.login, body.toString(), {
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //   }).pipe(map(this._handleLoginResponse, this));
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
      this.storage.setUser({
        uuid: this.demo.myInfo.uuid,
        name: this.demo.myInfo.name,
        firstName: this.demo.myInfo.firstName,
        lastName:this.demo.myInfo.lastName,
        email: this.demo.myInfo.email,
        image: this.demo.myInfo.image,
        role: this.demo.myInfo.role,
        contactNumber: this.demo.myInfo.contactNumber,
        userHash: this.demo.myInfo.userHash
      });
      return of(this.demo.myInfo);
    }
    return this.apollo.graphQLFetch(
      `query user {
        user {
          id
          uuid
          name
          firstName
          lastName
          email
          image
          role
          contactNumber
          userHash
          institution
        }
      }`
    ).pipe(map(this._handleMyInfoGraphQL, this));
  }

  private _handleMyInfoGraphQL(response) {
    if (response.data && response.data.user) {
      const thisUser = response.data.user;

      this.storage.setUser({
        uuid: thisUser.uuid,
        name: thisUser.name,
        firstName: thisUser.firstName,
        lastName: thisUser.lastName,
        email: thisUser.email,
        image: thisUser.image,
        role: thisUser.role,
        contactNumber: thisUser.contactNumber,
        userHash: thisUser.userHash,
        institutionName: thisUser.institution.name,
        institutionUuid: thisUser.institution.uuid
      });
    }
    return response;
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
    this.pusherService.unsubscribeChannels();
    this.pusherService.disconnect();
  }

}
