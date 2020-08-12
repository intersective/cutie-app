import { Component, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '@app/shared/services/storage.service';
import { RouterEnter } from '@app/shared/services/router-enter.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { ChatService, ChatChannel } from '@app/chat/chat.service';
import { ModalController } from '@ionic/angular';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-chat-info',
  templateUrl: 'chat-info.component.html',
  styleUrls: ['chat-info.component.scss']
})
export class ChatInfoComponent {

  @Input() selectedChat: ChatChannel;

  constructor(
    private chatService: ChatService,
    public router: Router,
    public storage: StorageService,
    public utils: UtilsService,
    public modalController: ModalController,
    private notification: NotificationService
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
    this.modalController.dismiss();
  }

  deleteChannel() {
    this.notification.alert({
      cssClass: 'chat-conformation',
      backdropDismiss: false,
      subHeader: 'Delete chat channel?',
      message: 'Are you sure you want to delete? <br> <small>*delete chat will erase the chat history</small>',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.chatService.deleteChatChannel(this.selectedChat.channelId)
            . subscribe(() => {
              this.modalController.dismiss();
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
