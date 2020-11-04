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
  chatChannels: ChatChannel[];
  groupChatChannels: ChatChannel[];
  directChatChannels: ChatChannel[];
  loadingChatList = true;
  filter: string;

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
    this.groupChatChannels = [];
    this.directChatChannels = [];
  }

  private _loadChatData(): void {
    this.chatService.getChatList().subscribe(chats => {
      // store the chat channels for filter later
      this.chatChannels = JSON.parse(JSON.stringify(chats));
      this._groupChatchannels();
      this.loadingChatList = false;
      this.chatListReady.emit(this.groupChatChannels.concat(this.directChatChannels));
    });
  }

  /**
   * Split the chat channels into two part: group chat & direct message
   * @param {ChatChannel[]} chatList The list of chat channels
   */
  private _groupChatchannels(chatList?: ChatChannel[]) {
    if (!chatList) {
      chatList = this.chatChannels;
    }
    this.groupChatChannels = [];
    this.directChatChannels = [];
    chatList.forEach(chat => {
      if (chat.isDirectMessage) {
        this.directChatChannels.push(chat);
      } else {
        this.groupChatChannels.push(chat);
      }
    });
  }

  /**
   * Filter the channels by the search text
   */
  public filterChannels() {
    const filteredChannels = this.chatChannels.filter(channel =>
      channel.name.toLowerCase().includes(this.filter.toLowerCase()) ||
      channel.targetUser && channel.targetUser.email.toLowerCase().includes(this.filter.toLowerCase())
    );
    this._groupChatchannels(filteredChannels);
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
    const chatIndex = this.chatChannels.findIndex(data => data.uuid === event.channelUuid);
    if (chatIndex > -1) {
      // set time out because when this calling from pusher events it need a time out.
      setTimeout(() => {
        this.chatChannels[chatIndex].unreadMessageCount -= event.readcount;
        if (this.chatChannels[chatIndex].unreadMessageCount < 0) {
          this.chatChannels[chatIndex].unreadMessageCount = 0;
        }
      });
    }
    this._groupChatchannels();
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

  createCohortChatChannel() {
    this.notification.alert({
      cssClass: 'chat-conformation',
      backdropDismiss: false,
      subHeader: 'Create cohort channel?',
      message: 'Are you sure you want to create cohort channel?',
      buttons: [
        {
          text: 'Create',
          handler: () => {
            this._createCohortChannelHandler();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  }

  private _createCohortChannelHandler() {
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
      if (!this._channelExist(chat)) {
        this.chatChannels.push(chat);
        this._groupChatchannels();
      }
    }, err => {});
  }

  private _channelExist(data) {
    const existingChannel = this.chatChannels.find((channel) => data.uuid === channel.uuid);
    if (existingChannel) {
      this.notification.alert({
        backdropDismiss: false,
        message: 'Oops! You already created successfully your cohort wide chat.',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.goToChatRoom(existingChannel);
            }
          }
        ]
      });
      return true;
    }
    return false;
  }

}
