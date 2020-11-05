import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '@app/shared/services/storage.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { ChatService, ChatChannel, ChannelMembers, SearchUsersParam, User } from '@app/chat/chat.service';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './direct-chat.component.html',
  styleUrls: ['./direct-chat.component.scss'],
})
export class DirectChatComponent implements OnInit {

  searchText: string;
  userList: User[] = [];
  loadingUsers: Boolean = false;
  currentEnrolmentUuid: string;

  constructor(
    public modalController: ModalController,
    private chatService: ChatService,
    public storage: StorageService,
    public utils: UtilsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this._initialise();
  }

  close() {
    this.modalController.dismiss({
      // channelName: this.channelName
    });
  }

  private _initialise() {
    this.searchText = '';
    this.userList = [];
    this.loadingUsers = false;
    if (this.storage.getUser().enrolmentUuid) {
      this.currentEnrolmentUuid = this.storage.getUser().enrolmentUuid;
    } else {
      this._getEnrolmentUuid();
    }
  }

  private _getEnrolmentUuid() {
    this.authService.getUserEnrolmentUuid().subscribe(
      (response) => {
        if (!response.enrolmentUuid) {
          return;
        }
        this.currentEnrolmentUuid = response.enrolmentUuid;
        this.storage.setUser({
          enrolmentUuid: response.enrolmentUuid
        });
      },
      error => {}
    );
  }

  searchUsers() {
  }

}
