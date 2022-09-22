import { Component, Output, EventEmitter, NgZone, Input, OnInit } from '@angular/core';
import { StorageService } from '@app/shared/services/storage.service';
import { ChatService, ChatChannel, ChannelMembers } from '@app/chat/chat.service';
import { ModalController } from '@ionic/angular';
import { NotificationService } from '@services/notification.service';
import { UtilsService } from '@services/utils.service';

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
    public storage: StorageService,
    public modalController: ModalController,
    private notification: NotificationService,
    public utils: UtilsService
  ) {}

  ngOnInit() {
    this._initialise();
    this._loadMembers();
  }

  /**
   * Initialise all variables
   */
  private _initialise() {
    this.memberList = [];
    this.loadingMembers = false;
    this.channelName = this.selectedChat.name;
    this.enableSave = false;
  }

  /**
   * Call chat service to get members of current selected chat channel.
   */
  private _loadMembers() {
    this.loadingMembers = true;
    this.chatService.getChatMembers(this.selectedChat.uuid).subscribe(
      (response) => {
        this.loadingMembers = false;
        if (response.length === 0) {
          return;
        }
        this.memberList = response;
      },
      error => {
        this.loadingMembers = false;
      }
    );
  }

  /**
   * close the info page.
   */
  close() {
    this.modalController.dismiss({
      channelName: this.channelName
    });
  }

  /**
   * calling from input key up event.
   * check selected chat channel name and the name in text file is different or not.
   * if it's different show the save if not hide save.
   * @param event text field key up event object.
   */
  checkNamechanged(event) {
    if (event.target.value !== this.selectedChat.name) {
      this.enableSave = true;
    } else {
      this.enableSave = false;
    }
  }

  /**
   * Call char service to detele sected chat channel.
   * First show a popup asking for comfimation to delete.
   * if you confirm delete, then call chat service to delete channel.
   */
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

  /**
   * Call chat service to update chat channel.
   * Currently only updating channel name.
   */
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
