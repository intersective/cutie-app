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
  @Input() skeletonOnly: boolean;
  chatChannels: ChatChannel[];
  groupChatChannels: ChatChannel[];
  directChatChannels: ChatChannel[];
  loadingChatList = true;
  isGroupChatExpand = true;
  isDirectChatExpand = true;
  filter: string;

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
    if (this.skeletonOnly) {
      this.loadingChatList = true;
      return;
    }
    this._initialise();
    this._checkAndSubscribePusherChannels();
    this._loadChatData();
  }

  private _initialise() {
    this.loadingChatList = true;
    this.isGroupChatExpand = true;
    this.isDirectChatExpand = true;
    this.groupChatChannels = [];
    this.directChatChannels = [];
  }

  private _loadChatData(): void {
    this.chatService.getChatList().subscribe(chats => {
      // store the chat channels for filter later
      this.chatChannels = JSON.parse(JSON.stringify(chats));
      this._groupingChatChannels();
      this.loadingChatList = false;
      this.chatListReady.emit(this.groupChatChannels.concat(this.directChatChannels));
    });
  }

  /**
   * Split the chat channels into two part: group chat & direct message
   * @param chatList The list of chat channels
   */
  private _groupingChatChannels(chatList?: ChatChannel[]) {
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
    // sort both chat channels after grouping them.
    this.directChatChannels = this._sortChatList(this.directChatChannels);
    this.groupChatChannels = this._sortChatList(this.groupChatChannels);
  }

  /**
   * Sort chat channel list to show latest chat to on top.
   * @param chatList Array of chat channels.
   * @returns ChatChannel[]
   */
     private _sortChatList(chatList: ChatChannel[]) {
      chatList.sort(function(a, b) {
        return new Date(b.lastMessageCreated).getTime() - new Date(a.lastMessageCreated).getTime();
      });
      return chatList;
    }

  /**
   * Filter the channels by the search text
   */
  public filterChannels() {
    const filteredChannels = this.chatChannels.filter(channel =>
      channel.name.toLowerCase().includes(this.filter.toLowerCase()) ||
      channel.targetUser && channel.targetUser.email.toLowerCase().includes(this.filter.toLowerCase())
    );
    this._groupingChatChannels(filteredChannels);
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
    console.log('_updateUnread');
    // if (!this.utils.isEmpty(this.chatChannels)) {
    //   const chatIndex = this.chatChannels.findIndex(data => data.uuid === event.channelUuid);
    //   if (chatIndex > -1) {
    //     // set time out because when this calling from pusher events it need a time out.
    //     setTimeout(() => {
    //       this.chatChannels[chatIndex].unreadMessageCount -= event.readcount;
    //       if (this.chatChannels[chatIndex].unreadMessageCount < 0) {
    //         this.chatChannels[chatIndex].unreadMessageCount = 0;
    //       }
    //     });
    //   }
    //   this._groupingChatChannels();
    // }
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
      this._groupingChatChannels();
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

  /**
   * Ask confomation to create cohort chat channel.
   * Will show a popup confomation.
   * if user conform, then it call _createCohortChannelHandler method to create cohort channel.
   */
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

  /**
   * Call chat service to create cohort channel
   */
  private _createCohortChannelHandler() {
    const timeLineId = this.storage.getUser().timelineId;
    const timelineUuid = this.storage.getUser().timelineUuid;
    const currentProgram = this.storage.get('programs').find(program => {
      return program.timeline.id === timeLineId;
    });
    this.chatService.createChannel({
      name: currentProgram.timeline.title,
      isAnnouncement: false,
      roles: ['participant', 'mentor', 'admin', 'coordinator'],
      members: [{
        type: 'Timeline',
        uuid: timelineUuid
      }]
    }).subscribe(chat => {
      if (!this._channelExist(chat, 'cohort')) {
        this.chatChannels.push(chat);
        this._groupingChatChannels();
      }
    }, err => { });
  }

  /**
   * check new created chat is already exist in the list.
   * if it already exist, then select that channel.
   * @param data created chat channel object
   * @param channelType channel type currently cohort and direct
   */
  private _channelExist(data, channelType) {
    let alertMessage = '';
    switch (channelType) {
      case 'cohort':
      alertMessage = 'Oops! You already created successfully your cohort wide chat.';
      break;
      case 'direct':
      alertMessage = 'Oops! You already started conversation with this user.';
      break;
    }
    const existingChannel = this.chatChannels.find((channel) => data.uuid === channel.uuid);
    if (existingChannel) {
      this.notification.alert({
        backdropDismiss: false,
        message: alertMessage,
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

  /**
   * This will expand or shrink different chat groups sections.
   * @param type message section type
   */
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

  /**
   * This will open create direct chat channel popup to create direct channel.
   */
  async openCreateDirectChatPopup() {
    const modal = await this.modalController.create({
      component: DirectChatComponent,
      cssClass: 'chat-direct-message',
      keyboardClose: false
    });
    await modal.present();
    modal.onWillDismiss().then((data) => {
      if (data.data && data.data.newChannel) {
        if (!this._channelExist(data.data.newChannel, 'direct')) {
          this.chatChannels.push(data.data.newChannel);
          this._groupingChatChannels();
          // Subscribe to the pusher channel of new create chat channel.
          this._checkAndSubscribePusherChannels();
          this.goToChatRoom(data.data.newChannel);
        }
      }
    });
  }

}
