import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '@app/shared/services/storage.service';
import { ChatService, ChatChannel } from '@app/chat/chat.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-group-chat-popup',
  templateUrl: './group-chat-popup.component.html',
  styleUrls: ['./group-chat-popup.component.scss'],
})
export class GroupChatPopupComponent implements OnInit {

  isCohortChecked: boolean;
  creating: boolean;

  constructor(
    public modalController: ModalController,
    private chatService: ChatService,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this._initialise();
  }

  /**
   * This will cloase the group chat popup
   */
  close() {
    this.modalController.dismiss({
      newChannels: null
    });
  }

  private _initialise() {
    this.creating = false;
    this.isCohortChecked = false;
  }

  /**
 * This call chat service to create group channel
 */
  async createChatChannels() {
    const timeLineId = this.storage.getUser().timelineId;
    const timelineUuid = this.storage.getUser().timelineUuid;
    const currentProgram = this.storage.get('programs').find(program => {
      return program.timeline.id === timeLineId;
    });
    this.creating = true;
    if (this.isCohortChecked) {
      this.chatService.createChannel({
        name: currentProgram.timeline.title,
        isAnnouncement: false,
        roles: ['participant', 'mentor', 'admin', 'coordinator'],
        members: [{
          type: 'Timeline',
          uuid: timelineUuid
        }]
      }).subscribe(chat => {
        this.creating = false;
        this.modalController.dismiss({
          newChannel: chat
        });
      }, err => { });
    }
  }

}
