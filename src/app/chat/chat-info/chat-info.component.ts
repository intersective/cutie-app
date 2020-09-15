import { Component, Output, EventEmitter, NgZone, Input, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '@app/shared/services/storage.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { ChatService, ChatChannel } from '@app/chat/chat.service';
import { ModalController } from '@ionic/angular';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-chat-info',
  templateUrl: 'chat-info.component.html',
  styleUrls: ['chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit {

  @Input() selectedChat: ChatChannel;
  channelName: string;
  enableSave: boolean;

  constructor(
    private chatService: ChatService,
    public router: Router,
    public storage: StorageService,
    public utils: UtilsService,
    public modalController: ModalController,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this._initialise();
  }

  private _initialise() {
    this.channelName = this.selectedChat.channelName;
    this.enableSave = false;
  }

  close() {
    this.modalController.dismiss({
      channelName: this.channelName
    });
  }

  checkNamechanged(event) {
    if (event.target.value !== this.selectedChat.channelName) {
      this.enableSave = true;
    } else {
      this.enableSave = false;
    }
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
              this.modalController.dismiss({
                type: 'channelDeleted'
              });
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

  editChannelDetail() {
    this.chatService.editChatChannel({
      channel_id: this.selectedChat.channelId,
      channel_name: this.channelName
    })
    .subscribe((response) => {
      this.selectedChat.channelName = response.data.channel_name;
      this.channelName = response.data.channel_name;
      this.enableSave = false;
    });
  }

}
