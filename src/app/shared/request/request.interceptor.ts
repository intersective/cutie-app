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
    if ((req.url.includes('ipapi.co')) || (req.url.includes('filestackapi.com')) || (req.url.includes('filestackcontent.com/video_convert'))) {
      return next.handle(req);
    }
    const apikey = this.storage.getUser().apikey;
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
