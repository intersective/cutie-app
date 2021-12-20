import { Injectable, Inject } from '@angular/core';
import * as _ from 'lodash';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '@services/storage.service';

// @TODO: enhance Window reference later, we shouldn't refer directly to browser's window object like this
declare var window: any;
declare var hbspt: any;

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  private lodash;
  protected _eventsSubject = new Subject<{key: string, value: any}>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: StorageService,
    private http: HttpClient,
  ) {
    if (_) {
      this.lodash = _;
    } else {
      throw new Error('Lodash not available');
    }
  }

  /**
   * isMobile
   * @description grouping device type into 2 group (mobile/desktop) and return true if mobile, otherwise return false
   * @example https://github.com/ionic-team/ionic/blob/master/angular/src/providers/platform.ts#L71-L115
   */
  isMobile() {
    return window.innerWidth <= 576;
  }

  isEmpty(value: any): boolean {
    return this.lodash.isEmpty(value);
  }

  isEqual(value: any, other: any): boolean {
    return this.lodash.isEqual(value, other);
  }

  each(collections, callback) {
    return this.lodash.each(collections, callback);
  }

  unset(object, path) {
    return this.lodash.unset(object, path);
  }

  find(collections, callback) {
    return this.lodash.find(collections, callback);
  }

  has(object, path) {
    return this.lodash.has(object, path);
  }

  indexOf(array, value, fromIndex= 0) {
    return this.lodash.indexOf(array, value, fromIndex);
  }

  remove(collections, callback) {
    return this.lodash.remove(collections, callback);
  }

  openUrl(url, options?: { target: String }) {
    options = options || {target: '_self' };
    return window.open(url, options.target);
  }

  // given an array and a value, check if this value is in this array, if it is, remove it, if not, add it to the array
  addOrRemove(array: Array<any>, value) {
    const position = this.indexOf(array, value);
    if (position > -1) {
      // find the position of this value and remove it
      array.splice(position, 1);
    } else {
      // add it to the value array
      array.push(value);
    }
    return array;
  }

  changeThemeColor(color) {
    this.document.documentElement.style.setProperty('--ion-color-primary', color);
    this.document.documentElement.style.setProperty('--ion-color-primary-shade', color);
  }

  changeCardBackgroundImage(image) {
    this.document.documentElement.style.setProperty('--practera-card-background-image', 'url(\'' + image + '\')');
  }

  // broadcast the event to whoever subscribed
  broadcastEvent(key: string, value: any) {
    this._eventsSubject.next({ key, value });
  }

  // get Event to subscribe to
  getEvent(key: string): Observable<any> {
    return this._eventsSubject.asObservable()
      .pipe(
        filter(e => e.key === key),
        map(e => e.value)
      );
  }

  // transfer url query string to an object
  urlQueryToObject(query: string) {
    return JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  }

  /**
   * This is a time formatter that transfer time/date string to a nice string
   * It will return different string based on the comparision with 'compareWith' (default is today)
   * Any time before yesterday(one day before 'compareWith') will return 'Yesterday'
   * Any time today(the same day as 'compareWith') will return the time
   * Any other time will just return the date in "3 May" format
   * @param time        [The time string going to be formatted (In UTC timezone)]
   * @param compareWith [The time string used to compare with]
   */
  timeFormatter(time: string, compareWith?: string) {
    if (!time) {
      return '';
    }
    // if no compareWith provided, compare with today
    let compareDate = new Date();
    if (compareWith) {
      compareDate = new Date(this.timeStringFormatter(compareWith));
    }
    const date = new Date(this.timeStringFormatter(time));
    if (date.getFullYear() === compareDate.getFullYear() && date.getMonth() === compareDate.getMonth()) {
      if (date.getDate() === compareDate.getDate() - 1) {
        return 'Yesterday';
      }
      if (date.getDate() === compareDate.getDate() + 1) {
        return 'Tomorrow';
      }
      if (date.getDate() === compareDate.getDate()) {
        return new Intl.DateTimeFormat('en-US', {
          hour12: true,
          hour: 'numeric',
          minute: 'numeric'
        }).format(date);
      }
    }
    return new Intl.DateTimeFormat('en-GB', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  utcToLocal(time: string, display: string = 'all') {
    if (!time) {
      return '';
    }
    const date = new Date(this.timeStringFormatter(time));
    switch (display) {
      case 'date':
        const today = new Date();
        if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
          if (date.getDate() === today.getDate() - 1) {
            return 'Yesterday';
          }
          if (date.getDate() === today.getDate()) {
            return 'Today';
          }
          if (date.getDate() === today.getDate() + 1) {
            return 'Tomorrow';
          }
        }
        return new Intl.DateTimeFormat('en-GB', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }).format(date);

      case 'time':
        return new Intl.DateTimeFormat('en-US', {
          hour12: true,
          hour: 'numeric',
          minute: 'numeric'
        }).format(date);

      default:
        return new Intl.DateTimeFormat('en-GB', {
          hour12: true,
          hour: 'numeric',
          minute: 'numeric',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }).format(date);
    }
  }

  timeComparer(timeString: string, comparedString?: string) {
    const time = new Date(this.timeStringFormatter(timeString) + 'Z');
    let compared = new Date();
    if (comparedString) {
      compared = new Date(this.timeStringFormatter(comparedString) + 'Z');
    }
    if (time.getTime() < compared.getTime()) {
      return -1;
    }
    if (time.getTime() === compared.getTime()) {
      return 0;
    }
    if (time.getTime() > compared.getTime()) {
      return 1;
    }
  }

  /**
   * Format the time string
   * 1. Add 'T' between date and time, for compatibility with Safari
   * 2. Add 'Z' at last to indicate that it is UTC time, browser will automatically convert the time to local time
   *
   * Example time string: '2019-08-06 15:03:00'
   * After formatter: '2019-08-06T15:03:00Z'
   */
  timeStringFormatter(time: string) {
    if (!time.includes(':')) {
      return time;
    }
    // add "T" between date and time, so that it works on Safari
    time = time.replace(' ', 'T');
    // add "Z" to indicate that it is UTC time, it will automatically convert to local time
    return time + 'Z';
  }

    /**
   * Get the user's current location from IP
   */
  getIpLocation() {
    this._ipAPI().subscribe(
      res => this.storage.setCountry(res.country_name),
      err => console.log(err)
    );
  }

  private _ipAPI(): Observable<any> {
    return this.http.get('https://ipapi.co/json');
  }

  removeAllSpecialCharactersAndToLower(type: string): string {
    type = type.replace(/[!@#^_.$&*%\s\-]/g,''); // tslint:disable-line
    type = type.toLowerCase();
    return type;
  }

  /**
   * This is used to create a HubSpot form on the page
   */
  createHubSpotForm(
    formOptions: { formId: string, target?: string },
    hiddenValues?: [{ name: string; value: any }]
  ) {
    hbspt.forms.create({
      region: 'na1',
      portalId: '20987346',
      formId: formOptions.formId,
      target: formOptions.target || '#form',
      onFormSubmit: function($form) {
        hiddenValues.forEach(v => {
          this.document.getElementById('hs-form-iframe-0').contentDocument.querySelector(`input[name="${ v.name }"]`).value = v.value;
        });
      }
    });
    window.jQuery = window.jQuery || function(nodeOrSelector) {
      if (typeof(nodeOrSelector) === 'string') {
          return this.document.querySelector(nodeOrSelector);
      }
      return nodeOrSelector;
    };
  }

  /**
   * This method will return the icon related to onboarding project type
   * @param projectType type of the project user selected in onboarding
   * @returns icon (string) of the project
   */
  getIconForHeader(projectType: string) {
    switch (projectType) {
      case 'industryProject':
        return 'fa-building';
      case 'internship':
        return 'fa-user-astronaut';
      case 'workSimulation':
        return 'fa-briefcase';
      case 'mentoring':
        return 'fa-hands-helping';
      case 'accelerator':
        return 'fa-rocket';
    }
  }
}
