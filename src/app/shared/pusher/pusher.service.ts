import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpParameterCodec } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';
import { RequestService } from '@shared/request/request.service';
import { environment } from '@environments/environment';
import { UtilsService } from '@services/utils.service';
import { StorageService } from '@services/storage.service';

declare const Pusher: any;

const api = {
  pusherAuth: 'api/v2/message/notify/pusher_auth.json',
  channels: 'api/v2/message/notify/channels.json'
};

@Injectable({
  providedIn: 'root',
})

export class PusherService {
  private pusherKey = environment.pusherKey;
  private apiurl = environment.APIEndpointOld;
  private pusher;
  private channelNames = {
    presence: null,
    team: null,
    teamNoMentor: null,
    notification: null
  };
  private channels = {
    presence: null,
    team: null,
    teamNoMentor: null,
    notification: null
  };

  constructor(
    private http: HttpClient,
    private request: RequestService,
    private utils: UtilsService,
    public storage: StorageService
  ) { }

  initialisePusher() {
    try {
      this.pusher = new Pusher(this.pusherKey, {
        cluster: 'mt1',
        encrypted: true,
        authEndpoint: this.apiurl + api.pusherAuth,
        auth: {
          headers: {
            'Authorization': 'pusherKey=' + this.pusherKey,
            'appkey': environment.appkey,
            'apikey': this.storage.getUser().apikey,
            'timelineid': this.storage.getUser().timelineId
          },
        },
      });
    } catch (err) {
      throw new Error(err);
    }
    this.getChannels().subscribe();
  }

  getChannels() {
    // unsubscribe channels before subscribe the new ones
    this.unsubscribeChannels();
    return this.request.get(api.channels, {params: {
        env: environment.env
      }})
      .pipe(map(response => {
        if (response.data) {
          return this._subscribeChannels(response.data);
        }
      })
    );
  }

  // unsubscribe all channels
  unsubscribeChannels() {
    this.utils.each(this.channelNames, (channel, key) => {
      if (channel) {
        this.channelNames[key] = null;
        if (this.channels[key]) {
          // unbind all events from this channel
          this.channels[key].unbind();
          this.channels[key] = null;
        }
        this.pusher.unsubscribe(channel);
      }
    });
  }

  private _subscribeChannels(channels) {
    if (!Array.isArray(channels) || this.utils.isEmpty(channels)) {
      return this.request.apiResponseFormatError('Pusher channels format error');
    }
    channels.forEach(channel => {
      if (!this.utils.has(channel, 'channel')) {
        return this.request.apiResponseFormatError('Pusher channel format error');
      }
      // subscribe channels and bind events
      if (channel.channel.includes('private-' + environment.env + '-notification-')) {
        this.channelNames.notification = channel.channel;
        this.channels.notification = this.pusher.subscribe(channel.channel);
        this.channels.notification.bind('student-progress', data => {
          this.utils.broadcastEvent('student-progress', data);
        });
        return;
      }
    });
  }

}
