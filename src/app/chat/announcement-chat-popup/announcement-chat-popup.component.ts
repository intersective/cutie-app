import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '@app/shared/services/storage.service';
import { ChatService, ChatChannel, ChannelCreatePopupParam } from '@app/chat/chat.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-announcement-chat-popup',
  templateUrl: './announcement-chat-popup.component.html',
  styleUrls: ['./announcement-chat-popup.component.scss'],
})
export class AnnouncementChatPopupComponent implements OnInit {

  createdChannels: ChannelCreatePopupParam;

  isLearnersAnnouncementsChecked: boolean;
  learnersAnnouncementDisabled: boolean;
  isExpertsAnnouncementsChecked: boolean;
  expertsAnnouncementDisabled: boolean;
  createdChatChannels: any;
  creating: boolean;

  constructor(
    public modalController: ModalController,
    private chatService: ChatService,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this._initialise();
    this._handelCreatedChannels();
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
    this.createdChatChannels = {};
    this.expertsAnnouncementDisabled = false;
    this.isExpertsAnnouncementsChecked = false;
    this.learnersAnnouncementDisabled = false;
    this.isLearnersAnnouncementsChecked = false;
  }

  private _handelCreatedChannels() {
    if (!this.createdChannels) {
      return;
    }
    if (this.createdChannels.learnerAnnouncement) {
      this.isLearnersAnnouncementsChecked = true;
      this.learnersAnnouncementDisabled = true;
    }
    if (this.createdChannels.expertAnnouncement) {
      this.isExpertsAnnouncementsChecked = true;
      this.expertsAnnouncementDisabled = true;
    }
  }

  /**
   * This call chat service to create announcement channels
   */
  async createChatChannels() {
    this.creating = true;
    this.createdChatChannels = {};
    if (this.isLearnersAnnouncementsChecked && !this.learnersAnnouncementDisabled) {
      await this.createLearnerAnnoucementChannel().toPromise();
    }
    if (this.isExpertsAnnouncementsChecked && !this.expertsAnnouncementDisabled) {
      await this.createExpertAnnoucementChannel().toPromise();
    }
    this.creating = false;
    this.modalController.dismiss(this.createdChatChannels);
  }

  createLearnerAnnoucementChannel() {
    return this.chatService.createChannel({
      name: 'Learners Announcements',
      isAnnouncement: true,
      roles: ['participant', 'admin', 'coordinator'],
      members: [{
        type: 'Timeline',
        uuid: this.storage.timelineUuid
      }]
    }).pipe(
      map(chat => {
        this.createdChatChannels.learnerChannel = chat;
        return chat;
      }));
  }

  createExpertAnnoucementChannel() {
    return this.chatService.createChannel({
      name: 'Experts Announcements',
      isAnnouncement: true,
      roles: ['mentor', 'admin', 'coordinator'],
      members: [{
        type: 'Timeline',
        uuid: this.storage.timelineUuid
      }]
    }).pipe(
      map(chat => {
        this.createdChatChannels.expertChannel = chat;
        return chat;
      }));
  }

}
