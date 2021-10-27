import { Injectable } from '@angular/core';

// @TODO: enhance Window reference later, we shouldn't refer directly to browser's window object like this
declare var window: any;

@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {
  constructor() {}

  page(name: string, properties?: any) {
    if (!window.analytics) {
      return;
    }
    window.analytics.page('CUTIE', name, properties);
  }

  identify(id: string, properties?: any) {
    if (!window.analytics) {
      return;
    }
    window.analytics.identify(id, properties);
  }

  track(name: string, properties?: any) {
    if (!window.analytics) {
      return;
    }
    window.analytics.track(name, properties);
  }
}
