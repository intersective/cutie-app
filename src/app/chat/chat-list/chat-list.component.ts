import { Component, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
import { ChatService, ChatChannel } from '../chat.service';
import { NotificationService } from '@services/notification.service';
import { PusherService } from '@shared/pusher/pusher.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: 'chat-list.component.html',
  styleUrls: ['chat-list.component.scss']
})
export class ChatListComponent {
  @Output() navigate = new EventEmitter();
  @Output() chatListReady = new EventEmitter();
  @Input() currentChat: ChatChannel;
  chatList: ChatChannel[];
  loadingChatList = true;

  constructor(
    private chatService: ChatService,
    public router: Router,
    public storage: StorageService,
    public utils: UtilsService,
    private ngZone: NgZone,
    private notification: NotificationService,
    public pusherService: PusherService
  ) {
    this.utils.getEvent('chat:new-message').subscribe(event => this._loadChatData());
    this.utils.getEvent('chat:info-update').subscribe(event => this._loadChatData());
    this.utils.getEvent('chat-badge-update').subscribe(event => this._updateUnread(event));
  }

  onEnter() {
    this._initialise();
    this._checkAndSubscribePusherChannels();
    this._loadChatData();
  }

  private _initialise() {
    this.loadingChatList = true;
    this.chatList = [];
  }

  private _loadChatData(): void {
    this.chatService.getChatList().subscribe(chats => {
      this.chatList = chats;
      this.loadingChatList = false;
      this.chatListReady.emit(this.chatList);
    });
  }

    /**
   * This method pusher service to subscribe to chat pusher channels
   * - first it call chat service to get pusher channels.
   * - then it call pusher service 'subscribeChannel' method to subscribe.
   * - in pusher service it chaeck if we alrady subscribe or not.
   *   if not it will subscribe to the pusher channel.
   */
  private _checkAndSubscribePusherChannels() {
    this.chatService.getPusherChannels().subscribe(pusherChannels => {
      pusherChannels.forEach(channel => {
        this.pusherService.subscribeChannel('chat', channel.pusherChannel);
      });
    });
  }

  private _updateUnread(event) {
    const chatIndex = this.chatList.findIndex(data => data.uuid === event.channelUuid);
    if (chatIndex > -1) {
      // set time out because when this calling from pusher events it need a time out.
      setTimeout(() => {
        this.chatList[chatIndex].unreadMessageCount -= event.readcount;
        if (this.chatList[chatIndex].unreadMessageCount < 0) {
          this.chatList[chatIndex].unreadMessageCount = 0;
        }
      });
    }
  }

  goToChatRoom(chat: ChatChannel) {
    this._navigate(['chat', 'chat-room'], chat);
  }

  // force every navigation happen under radar of angular
  private _navigate(direction, chatChannel) {
    // emit event to parent component(chat view component)
    this.navigate.emit(chatChannel);
  }

  getChatDate(date) {
    return this.utils.timeFormatter(date);
  }

  createChatChannel() {
    this.notification.alert({
      cssClass: 'chat-conformation',
      backdropDismiss: false,
      subHeader: 'Create cohort channel?',
      message: 'Are you sure you want to create cohort channel?',
      buttons: [
        {
          text: 'Create',
          handler: () => {
            this._createChannelHandler();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  }

  private _createChannelHandler() {
    const timeLineId = this.storage.getUser().timelineId;
    const currentProgram = this.storage.get('programs').find(program => {
      return program.timeline.id === timeLineId;
    });
    this.chatService.createChannel({
      name: currentProgram.timeline.title,
      isAnnouncement: false,
      roles: ['participant', 'mentor'],
      members: [{
        type: 'Timeline',
        uuid: timeLineId
      }]
    }).subscribe(chat => {
      this.chatList.push(chat);
      this.chatListReady.emit(this.chatList);
    }, err => {
      if (err.data.message && err.data.message.includes('already exist')) {
        this.notification.alert({
          backdropDismiss: false,
          message: 'Oops! You already created successfully your cohort wide chat.',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              handler: () => {
                const cohortChat = this.chatList.find((data) => {
                  return err.data.id === data.uuid;
                });
                if (cohortChat) {
                  this.goToChatRoom(cohortChat);
                }
              }
            }
          ]
        });
      }
    });
  }

}
