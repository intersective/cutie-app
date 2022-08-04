import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { FilestackService } from '@shared/filestack/filestack.service';

import { ChatService, ChatChannel, Message, MessageListResult } from '../chat.service';

@Component({
  selector: 'app-schedule-message-popup',
  templateUrl: './schedule-message-popup.component.html',
  styleUrls: ['./schedule-message-popup.component.scss'],
})
export class ScheduleMessagePopupComponent implements OnInit {

  constructor(
    private chatService: ChatService,
    public storage: StorageService,
    public utils: UtilsService,
    public pusherService: PusherService,
    private filestackService: FilestackService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  async openDateSelectPopup() {
    const modal = await this.modalController.create({
      component: '<ion-datetime></ion-datetime>',
    });
    await modal.present();
    modal.onWillDismiss().then((data) => {
      console.log(data);
    });
  }

}
