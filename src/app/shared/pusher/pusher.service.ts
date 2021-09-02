import { Injectable, Optional, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpParameterCodec } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RequestService } from '@shared/request/request.service';
import { environment } from '@environments/environment';
import { UtilsService } from '@services/utils.service';
import { StorageService } from '@services/storage.service';
import { PusherStatic, Pusher, Config, Channel } from 'pusher-js';
import * as PusherLib from 'pusher-js';
import { urlFormatter } from 'helper';

const api = {
  pusherAuth: 'api/v2/message/notify/pusher_auth.json',
  channels: 'api/v2/message/notify/channels.json'
};

export interface SendMessageParam {
  channelUuid:  string;
  uuid: string;
  message: string;
  file: string;
  isSender: boolean;
  created: string;
  senderUuid: string;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
}

export class PusherConfig {
  pusherKey = '';
  apiurl = '';
}

class PusherChannel {
  name: string;
  subscription?: Channel;
}

@Injectable({
  providedIn: 'root',
})

export class PusherService {
  private pusherKey: string;
  private apiurl: string;
  private pusher: Pusher;
  private channels: {
    notification: PusherChannel;
    chat: PusherChannel[];
  } = {
    notification: null,
    chat: []
  };

  constructor(
    private http: HttpClient,
    @Optional() config: PusherConfig,
    private request: RequestService,
    private utils: UtilsService,
    public storage: StorageService,
    private ngZone: NgZone
  ) {
    if (config) {
      this.pusherKey = config.pusherKey;
      this.apiurl = config.apiurl;
    }
  }

  // initialise + subscribe to channels at one go
  async initialise(options?: {
    unsubscribe?: boolean;
  }) {
    // make sure pusher is connected
    if (!this.pusher) {
      console.log('initialise', '1');
      this.pusher = await this.initialisePusher();
    }
    console.log('initialise', '2');
    if (!this.pusher) {
      return {};
    }
    console.log('initialise', '3');
    if (options && options.unsubscribe) {
      console.log('initialise', '4');
      this.unsubscribeChannels();
    }
    console.log('initialise', '5');
    // handling condition at re-login without rebuilding pusher (where isInstantiated() is false)
    if (this.pusher.connection.state !== 'connected') {
      console.log('initialise', '6');
      // reconnect pusher
      this.pusher.connect();
    }

    // subscribe to event only when pusher is available
    console.log('initialise', '7', this.pusher);
    const channels = this.getChannels();
    console.log('initialise', '8');
    return {
      pusher: this.pusher,
      channels
    };
  }

  disconnect(): void {
    if (this.pusher) {
      return this.pusher.disconnect();
    }
    return;
  }

  // check if pusher has been instantiated correctly
  isInstantiated(): boolean {
    if (this.utils.isEmpty(this.pusher)) {
      return false;
    }

    if (this.pusher.connection.state === 'disconnected') {
      return false;
    }

    return true;
  }

  private async initialisePusher(): Promise<Pusher> {
    // during the app execution lifecycle
    if (typeof this.pusher !== 'undefined') {
      return this.pusher;
    }

    // prevent pusher auth before user authenticated (skip silently)
    const { apikey, timelineId } = this.storage.getUser();
    if (!apikey || !timelineId) {
      return this.pusher;
    }

    // never reinstantiate another instance of Pusher
    if (!this.utils.isEmpty(this.pusher)) {
      return this.pusher;
    }

    // 'apikey': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkucHJhY3RlcmEuY29tIiwiYXBpa2V5IjoiNjc2YjNmYTNjMzA1ODM0ZjIwZTIiLCJ1c2VyX2lkIjoxMzUxMywidXNlcl91dWlkIjoiMzEwY2RiN2EtMzY3My00NjBlLTkwMjItZjdhNTQwMDdlMjIwIiwidXNlcm5hbWUiOiJzYXNhbmdhK2F1dGhvcjAwMUBwcmFjdGVyYS5jb20iLCJyb2xlIjoiYWRtaW4iLCJwcm9ncmFtX2lkIjo2NTMsInRpbWVsaW5lX2lkIjo5ODIsInRpbWVsaW5lX3V1aWQiOiJhZjBjN2E3Ni01ODg0LTRkYzktYTgzMC0wZTg2ODFmODY0OTgiLCJlbnJvbG1lbnRfdXVpZCI6ImYyOWFkMDRiLWExYzMtNDdjMy1hMmFlLWRmZGUzZmZjMWYxOSIsImluc3RpdHV0aW9uX2lkIjo4NSwiaW5zdGl0dXRpb25fdXVpZCI6ImE5MWE2YzFjLTczOGItNDllMC1iZmJjLTI4OTkyMTgzZWNiZSIsImV4cGVyaWVuY2VfaWQiOjI5NiwicHJvamVjdF9pZCI6OTc5LCJpYXQiOjE2MzA0NzAxMzIsImV4cCI6MTYzODI0NjEzMn0.MxTViv23eMlB7JxSiI6oexp22kRkk2A7qHKmfhMjPAYkdIW-vwdC3V3Fi3u2_kRyz32pI-hV-xM1RNjPalevolzAYGnNAuFmzSbxWqmDbEh8enGqxLgZ7a_l6AbdXMWUNkfTCBCpm-JFcIeYKX4KxXScdie6QoZwLMPDnZRf6Bur_K-2FP7sgS57104_GBckeH2pfAYRjka-DTZ-K5z6tNeDud0x51KeSMZJv8mHSR60WCdBKYIoy-3IZt0MuWStERVsEm2Z97SKzmt2HcawroFq_a0Sgs8Sh3jGfU7F1Gpqrx9u4IpmdI7s-39Hm0I9SkqI7xfr8jBLcehIn421_6QDJ9kY1G62uAi88B4vSPfIi9tMdU4ICyBEkFN37j7nAYdtUYNDwqWiB_z2s8bl-RtXySYOliWXnKWsMOMEaLOOjCkRj2v3hOzDDHGlDIzmAIeKTu9fMvk69rQoMkPVGDUoDRVpxXDgb8T-YO8W-2ric_nX50THtk9Q40IJ2lEcdHCgOf39Fh10D4dL959IMXC_1dVUETRDzbB5-zi6xBcjd_DX1RL5UVGoQ9J9uid3kOpcFWS1Am9YCQBhmD0Lj7NugbSuhIPNy5RFWOxmgUTwe2FA-L9x8QWceLq1qstpee-AjgD5mc-T2x4e5FMRGxSBBYcv4ldLqz-udhbMp9Q',
    try {
      const config: Config = {
        cluster: 'mt1',
        forceTLS: true,
        authEndpoint: urlFormatter(this.apiurl, api.pusherAuth),
        auth: {
          headers: {
            'Authorization': 'pusherKey=' + this.pusherKey,
            'appkey': environment.appkey,
            'apikey': this.storage.getUser().apikey,
            'timelineid': this.storage.getUser().timelineId
          },
        },
      };
      const newPusherInstance = await new PusherLib(this.pusherKey, config);
      return newPusherInstance;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * check if every channel has been subscribed properly
   * true: subscribed
   * false: haven't subscribed
   */
  isSubscribed(channelName): boolean {
    console.log('isSubscribed --1', this.pusher.allChannels().find((channel: Channel) => channel.name === channelName && channel.subscribed));
    console.log('isSubscribed --2', this.pusher.allChannels());
    console.log('isSubscribed --', this.pusher);
    return !!this.pusher.allChannels().find((channel: Channel) => channel.name === channelName && channel.subscribed);
  }

  /**
   * get a list of channels from API request and subscribe every of them into
   * connected + authorised pusher
   */
   async getChannels() {
    if (environment.demo) {
      return;
    }
    await this.getNotificationChannel().toPromise();
    await this.getChatChannels().toPromise();
  }

  getNotificationChannel(): Observable<any> {
    return this.request.get(api.channels, {
      params: {
        env: environment.env,
        for: 'notification'
      }
    }).pipe(map(response => {
      if (response.data) {
        this.subscribeChannel('notification', response.data[0].channel);
      }
    }));
  }

  getChatChannels(): Observable<any> {
    return this.request.chatGraphQLQuery(
      `query getPusherChannels {
        channels {
          pusherChannel
        }
      }`
    ).pipe(map(response => {
      if (response.data && response.data.channels) {
        const result = JSON.parse(JSON.stringify(response.data.channels));
        result.forEach(element => {
          this.subscribeChannel('chat', element.pusherChannel);
        });
      }
    }));
  }

  /**
   * unsubscribe all channels
   * (use case: after switching program)
   */
  unsubscribeChannels(): void {
    if (!this.channels.notification) {
      return ;
    }
    this.channels.notification.subscription.unbind_all();
    // handle issue logout at first load of program-switching view
    if (this.pusher) {
      this.pusher.unbind_all();
      this.pusher.unsubscribe(this.channels.notification.name);
    }
    this.channels.chat.forEach(chat => {
      chat.subscription.unbind_all();
      if (this.pusher) {
        this.pusher.unsubscribe(chat.name);
      }
    });
    this.channels.notification = null;
    this.channels.chat = [];
  }

  /**
   * Subscribe a Pusher channel
   * @param type        The type of Pusher channel (notification/chat)
   * @param channelName The name of the Pusher channel
   */
  subscribeChannel(type: string, channelName: string) {
    console.log('subscribeChannel -- 1', type, channelName);
    if (!channelName) {
      return false;
    }
    console.log('subscribeChannel -- 2');
    if (this.isSubscribed(channelName)) {
      return;
    }
    console.log('subscribeChannel -- 3');
    switch (type) {
      case 'notification':
        this.channels.notification = {
          name: channelName,
          subscription: this.pusher.subscribe(channelName)
        };
        this.channels.notification.subscription
          .bind('notification', data => {
            this.utils.broadcastEvent('notification', data);
          })
          .bind('achievement', data => {
            this.utils.broadcastEvent('achievement', data);
          })
          .bind('event-reminder', data => {
            this.utils.broadcastEvent('event-reminder', data);
          })
          .bind('pusher:subscription_succeeded', data => {
          })
          .bind('pusher:subscription_error', data => {
            // error handling
          });
        break;
      case 'chat':
        // don't need to subscribe again if already subscribed
        if (this.channels.chat.find(c => c.name === channelName)) {
          return;
        }
        const channel = {
          name: channelName,
          subscription: this.pusher.subscribe(channelName)
        };
        channel.subscription
        .bind('client-chat-new-message', data => {
          console.log('bind chat:new-message', '1', data);
          this.utils.broadcastEvent('chat:new-message', data);
        })
        .bind('client-typing-event', data => {
          this.utils.broadcastEvent('typing-' + channelName, data);
        })
        .bind('pusher:subscription_succeeded', data => {
        })
        .bind('pusher:subscription_error', data => {
          // error handling
        });
        if (!this.channels.chat) {
          this.channels.chat = [];
        }
        this.channels.chat.push(channel);
        break;
    }
  }

  /**
   * When the current user start typing, send notification to the Pusher channel
   * from pusher doc
   * - A client event must have a name prefixed with 'client'- or it will be rejected by the server.
   * - Client events can only be triggered on 'private' and 'presence' channels because they require authentication
   * - private channel name start with 'private-' and presence channel name start with 'presence-'
   */
  triggerTyping(channelName): void {
    const channel = this.channels.chat.find(c => c.name === channelName);
    if (!channel) {
      return;
    }
    channel.subscription.trigger('client-typing-event', {
      user: this.storage.getUser().name
    });
  }

    /**
   * This method triggering 'client-chat-new-message' event of a pusher channel to send message to other members
   * that subscribe to the pusher channel.
   * when user send message it will save in api first and then call this.
   * @param channelName pusher channel name that need to trigger the event on
   * @param data send message object
   */
  triggerSendMessage(channelName: string, data: SendMessageParam) {
    console.log('triggerSendMessage', '1', data);
    const channel = this.channels.chat.find(c => c.name === channelName);
    console.log('triggerSendMessage', '2', channel);
    if (!channel) {
      return;
    }
    console.log('triggerSendMessage', '3');
    const istrig = channel.subscription.trigger('client-chat-new-message', data);
    console.log('triggerSendMessage', '4', istrig);
  }

}
