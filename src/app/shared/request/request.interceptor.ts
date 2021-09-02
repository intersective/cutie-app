import { Injectable, Optional } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '@services/storage.service';
import { environment } from '@environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private storage: StorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ((req.url.includes('ipapi.co')) || (req.url.includes('filestackapi.com'))) {
      return next.handle(req);
    }
    const apikey = this.storage.getUser().apikey;
    // const apikey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkucHJhY3RlcmEuY29tIiwiYXBpa2V5IjoiNjc2YjNmYTNjMzA1ODM0ZjIwZTIiLCJ1c2VyX2lkIjoxMzUxMywidXNlcl91dWlkIjoiMzEwY2RiN2EtMzY3My00NjBlLTkwMjItZjdhNTQwMDdlMjIwIiwidXNlcm5hbWUiOiJzYXNhbmdhK2F1dGhvcjAwMUBwcmFjdGVyYS5jb20iLCJyb2xlIjoiYWRtaW4iLCJwcm9ncmFtX2lkIjo2NTMsInRpbWVsaW5lX2lkIjo5ODIsInRpbWVsaW5lX3V1aWQiOiJhZjBjN2E3Ni01ODg0LTRkYzktYTgzMC0wZTg2ODFmODY0OTgiLCJlbnJvbG1lbnRfdXVpZCI6ImYyOWFkMDRiLWExYzMtNDdjMy1hMmFlLWRmZGUzZmZjMWYxOSIsImluc3RpdHV0aW9uX2lkIjo4NSwiaW5zdGl0dXRpb25fdXVpZCI6ImE5MWE2YzFjLTczOGItNDllMC1iZmJjLTI4OTkyMTgzZWNiZSIsImV4cGVyaWVuY2VfaWQiOjI5NiwicHJvamVjdF9pZCI6OTc5LCJpYXQiOjE2MzA0NzAxMzIsImV4cCI6MTYzODI0NjEzMn0.MxTViv23eMlB7JxSiI6oexp22kRkk2A7qHKmfhMjPAYkdIW-vwdC3V3Fi3u2_kRyz32pI-hV-xM1RNjPalevolzAYGnNAuFmzSbxWqmDbEh8enGqxLgZ7a_l6AbdXMWUNkfTCBCpm-JFcIeYKX4KxXScdie6QoZwLMPDnZRf6Bur_K-2FP7sgS57104_GBckeH2pfAYRjka-DTZ-K5z6tNeDud0x51KeSMZJv8mHSR60WCdBKYIoy-3IZt0MuWStERVsEm2Z97SKzmt2HcawroFq_a0Sgs8Sh3jGfU7F1Gpqrx9u4IpmdI7s-39Hm0I9SkqI7xfr8jBLcehIn421_6QDJ9kY1G62uAi88B4vSPfIi9tMdU4ICyBEkFN37j7nAYdtUYNDwqWiB_z2s8bl-RtXySYOliWXnKWsMOMEaLOOjCkRj2v3hOzDDHGlDIzmAIeKTu9fMvk69rQoMkPVGDUoDRVpxXDgb8T-YO8W-2ric_nX50THtk9Q40IJ2lEcdHCgOf39Fh10D4dL959IMXC_1dVUETRDzbB5-zi6xBcjd_DX1RL5UVGoQ9J9uid3kOpcFWS1Am9YCQBhmD0Lj7NugbSuhIPNy5RFWOxmgUTwe2FA-L9x8QWceLq1qstpee-AjgD5mc-T2x4e5FMRGxSBBYcv4ldLqz-udhbMp9Q';
    let headerClone = req.headers;
    const paramsInject = req.params;

    // inject appkey
    headerClone = headerClone.set('appkey', environment.appkey);
    if (apikey) {
      headerClone = headerClone.set('apikey', apikey);
    }

    return next.handle(req.clone({
      headers: headerClone,
      params: paramsInject,
    }));
  }
}
