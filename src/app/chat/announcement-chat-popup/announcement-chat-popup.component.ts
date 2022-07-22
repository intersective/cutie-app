import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '@app/shared/services/storage.service';
import { ChatService, ChatChannel, ChannelMembers, SearchUsersParam, User } from '@app/chat/chat.service';
import { AuthService } from '@app/auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-announcement-chat-popup',
  templateUrl: './announcement-chat-popup.component.html',
  styleUrls: ['./announcement-chat-popup.component.scss'],
})
export class AnnouncementChatPopupComponent implements OnInit {

  timelineUuid: string;

  isLearnersAnnouncementsChecked: boolean;
  isExpertsAnnouncementsChecked: boolean;
  createdChatChannels: any;
  creating: boolean;

  constructor(
    public modalController: ModalController,
    private chatService: ChatService,
    public storage: StorageService,
    private authService: AuthService
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
    this.createdChatChannels = {};
    this.isExpertsAnnouncementsChecked = false;
    this.isLearnersAnnouncementsChecked = false;
    this.timelineUuid = this.storage.getUser().timelineUuid;
  }

  /**
   * This call chat service to create announcement channels
   */
  async createChatChannels() {
    this.creating = true;
    this.createdChatChannels = {};
    if (this.isLearnersAnnouncementsChecked) {
      await this.createLearnerAnnoucementChannel().toPromise();
    }
    if (this.isExpertsAnnouncementsChecked) {
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
        uuid: this.timelineUuid
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
        uuid: this.timelineUuid
      }]
    }).pipe(
      map(chat => {
        this.createdChatChannels.expertChannel = chat;
        return chat;
      }));
  }

}
