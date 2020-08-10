import { Component, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { RouterEnter } from '@services/router-enter.service';
import { UtilsService } from '@services/utils.service';
// import { FastFeedbackService } from '../../fast-feedback/fast-feedback.service';
import { ChatService, ChatChannel } from '../chat.service';

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
    // public fastFeedbackService: FastFeedbackService,
    private ngZone: NgZone
  ) {
    this.utils.getEvent('chat:new-message').subscribe(event => this._loadChatData());
  }

  onEnter() {
    this._initialise();
    this._loadChatData();
    // this.fastFeedbackService.pullFastFeedback().subscribe();
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

}
