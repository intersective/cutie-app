import { Component, Output, EventEmitter, NgZone, Input, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '@app/shared/services/storage.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { ChatService, ChatChannel, ChannelMembers } from '@app/chat/chat.service';
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
  // channel member list
  memberList: ChannelMembers[] = [];
  loadingMembers: boolean;

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
    this._loadMembers();
  }

  private _initialise() {
    this.memberList = [];
    this.loadingMembers = false;
    this.channelName = this.selectedChat.name;
    this.enableSave = false;
  }

  private _loadMembers() {
    this.loadingMembers = true;
    this.chatService.getChatMembers(this.selectedChat.uuid).subscribe(
      (response) => {
        if (response.length === 0) {
          this.loadingMembers = false;
          return;
        }
        this.memberList = response;
      },
      error => {
        this.loadingMembers = false;
      }
    );
  }

  close() {
    this.modalController.dismiss({
      channelName: this.channelName
    });
  }

  checkNamechanged(event) {
    if (event.target.value !== this.selectedChat.name) {
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
            this.chatService.deleteChatChannel(this.selectedChat.uuid)
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
      uuid: this.selectedChat.uuid,
      name: this.channelName
    })
    .subscribe((response) => {
      this.selectedChat.name = response.name;
      this.channelName = response.name;
      this.enableSave = false;
    });
  }

}
