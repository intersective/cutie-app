import { Injectable } from '@angular/core';

// @TODO: enhance Window reference later, we shouldn't refer directly to browser's window object like this
declare var window: any;

@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {
  constructor() {}

  page(name: string, properties?: any) {
    window.analytics.page('CUTIE', name, properties);
  }

  identify(id: string, properties?: any) {
    window.analytics.identify(id, properties);
  }

  track(name: string, properties?: any) {
    window.analytics.track(name, properties);
  }
}
