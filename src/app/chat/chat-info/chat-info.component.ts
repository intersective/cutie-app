import { Component, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '@app/shared/services/storage.service';
import { RouterEnter } from '@app/shared/services/router-enter.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { ChatService, ChatListObject, ChatRoomObject } from '@app/chat/chat.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chat-info',
  templateUrl: 'chat-info.component.html',
  styleUrls: ['chat-info.component.scss']
})
export class ChatInfoComponent {

  @Input() selectedChat: ChatRoomObject;

  constructor(
    private chatService: ChatService,
    public router: Router,
    public storage: StorageService,
    public utils: UtilsService,
    public modalController: ModalController,
  ) {
  }

  onEnter() {
    this._initialise();
  }

  private _initialise() {
  }

  getChatDate(date) {
    return this.utils.timeFormatter(date);
  }

  close() {
    console.log('qw', this.selectedChat);
    this.modalController.dismiss();
  }

}
