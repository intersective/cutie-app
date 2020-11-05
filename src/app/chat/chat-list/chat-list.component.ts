import { Component, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
import { ChatService, ChatChannel } from '../chat.service';
import { NotificationService } from '@services/notification.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { DirectChatComponent } from '../direct-chat/direct-chat.component';
import { IonContent, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chat-list',
  templateUrl: 'chat-list.component.html',
  styleUrls: ['chat-list.component.scss']
})
export class ChatListComponent {
  @Output() navigate = new EventEmitter();
  @Output() chatListReady = new EventEmitter();
  @Input() currentChat: ChatChannel;
  groupChatList: ChatChannel[];
  directChatList: ChatChannel[];
  loadingChatList = true;
  isGroupChatExpand = true;
  isDirectChatExpand = true;

  constructor(
    private chatService: ChatService,
    public router: Router,
    public storage: StorageService,
    public utils: UtilsService,
    private ngZone: NgZone,
    private notification: NotificationService,
    public pusherService: PusherService,
    private modalController: ModalController,
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
    this.groupChatList = [];
    this.directChatList = [];
    this.isGroupChatExpand = true;
    this.isDirectChatExpand = true;
  }

  private _loadChatData(): void {
    this.chatService.getChatList().subscribe(chats => {
      this._groupChatchannels(chats);
      this.loadingChatList = false;
      this.chatListReady.emit(this.groupChatList.concat(this.directChatList));
    });
  }

  private _groupChatchannels(chatList) {
    chatList.forEach(chat => {
      if (chat.isDirectMessage) {
        this.directChatList.push(chat);
      } else {
        this.groupChatList.push(chat);
      }
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
    const groupChatIndex = this.groupChatList.findIndex(data => data.uuid === event.channelUuid);
    const directChatIndex = this.directChatList.findIndex(data => data.uuid === event.channelUuid);
    if (groupChatIndex > -1) {
      // set time out because when this calling from pusher events it need a time out.
      setTimeout(() => {
        this.groupChatList[groupChatIndex].unreadMessageCount -= event.readcount;
        if (this.groupChatList[groupChatIndex].unreadMessageCount < 0) {
          this.groupChatList[groupChatIndex].unreadMessageCount = 0;
        }
      });
    } else if (directChatIndex > -1) {
      // set time out because when this calling from pusher events it need a time out.
      setTimeout(() => {
        this.directChatList[directChatIndex].unreadMessageCount -= event.readcount;
        if (this.directChatList[directChatIndex].unreadMessageCount < 0) {
          this.directChatList[directChatIndex].unreadMessageCount = 0;
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
      if (!this._checkChannelAlreadyExist(chat)) {
        if (chat.isDirectMessage) {
          this.directChatList.push(chat);
        } else {
          this.groupChatList.push(chat);
        }
        this.chatListReady.emit(this.groupChatList.concat(this.directChatList));
      }
    }, err => { });
  }

  private _checkChannelAlreadyExist(data) {
    let existChannel = null;
    existChannel = this.directChatList.find((channel) => {
      return data.uuid === channel.uuid;
    });
    existChannel = this.groupChatList.find((channel) => {
      return data.uuid === channel.uuid;
    });
    if (!existChannel) {
      return false;
    }
    this.notification.alert({
      backdropDismiss: false,
      message: 'Oops! You already created successfully your cohort wide chat.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            this.goToChatRoom(existChannel);
          }
        }
      ]
    });
  }

  expandAndShrinkMessageSections(type) {
    switch (type) {
      case 'direct':
        this.isDirectChatExpand = !this.isDirectChatExpand;
        break;
      case 'group':
        this.isGroupChatExpand = !this.isGroupChatExpand;
        break;
    }
  }

  async openCreateDirectChatPopup() {
    console.log('wsdsd');
    const modal = await this.modalController.create({
      component: DirectChatComponent,
      cssClass: 'chat-direct-message',
      componentProps: {
        // selectedChat: this.chatChannel,
      },
      keyboardClose: false
    });
    await modal.present();
    // modal.onWillDismiss().then((data) => {
    //   if (data.data && (data.data.type === 'channelDeleted' || data.data.channelName !== this.chatChannel.name)) {
    //     this.utils.broadcastEvent('chat:info-update', true);
    //   }
    // });
  }

}
