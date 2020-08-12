import { Component, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { RouterEnter } from '@services/router-enter.service';
import { UtilsService } from '@services/utils.service';
import { ChatService, ChatChannel } from '../chat.service';
import { NotificationService } from '@services/notification.service';

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
    private notification: NotificationService
  ) {
    this.utils.getEvent('chat:new-message').subscribe(event => this._loadChatData());
  }

  onEnter() {
    this._initialise();
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
            const timeLineId = this.storage.getUser().timelineId;
            const currentProgram = this.storage.get('programs').find(program => {
              return program.timeline.id === timeLineId;
            });
            this.chatService.createChannel({
              name: currentProgram.title,
              announcement: false,
              roles: ['participant', 'mentor'],
              members: [{
                member_type: 'Timeline',
                member_id: timeLineId
              }]
            }). subscribe(chat => {
            this.chatList.push(chat);
            this.chatListReady.emit(this.chatList);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  }

}
