import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

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


  @Input() scheduledMessage: string;
  @Input() channelUuid: string;
  @Input() channelName: string;
  uploadedFile: any;
  uploading: boolean;
  selectedDate: string;
  selectedTime: string;
  sending: boolean;
  invalidDate: boolean;
  invalidTime: boolean;
  createdMessage: Message;

  constructor(
    private chatService: ChatService,
    public storage: StorageService,
    public utils: UtilsService,
    public pusherService: PusherService,
    private filestackService: FilestackService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this._initialise();
  }

  private _initialise() {
    this.uploading = false;
    this.sending = false;
    this.selectedDate = '';
    this.selectedTime = '';
    this.uploadedFile = null;
    this.invalidDate = false;
    this.invalidTime = false;
    this.createdMessage = null;
  }

  /**
   * This will cloase the group chat popup
   */
  close() {
    this.modalController.dismiss();
  }

  scheduleMessage() {
    const dateObj = new Date(`${this.selectedDate} ${this.selectedTime}`);
    if (!this.selectedDate || !this.selectedTime || !this.scheduledMessage || !this.channelUuid) {
      return;
    }
    this.sending = true;
    this.chatService.postNewMessage({
      channelUuid: this.channelUuid,
      message: this.scheduledMessage,
      file: this.uploadedFile,
      scheduled: dateObj.toISOString()
    }).subscribe(
      response => {
        this.createdMessage = response;
        this.sending = false;
      },
      error => {
        console.log(error);
        this.sending = false;
      }
    );
  }

  async uploadAttachment() {
    const type = 'any';
    const options: any = {};

    if (this.filestackService.getFileTypes(type)) {
      options.accept = this.filestackService.getFileTypes(type);
      options.storeTo = this.filestackService.getS3Config(type);
    }
    await this.filestackService.open(
      options,
      res => {
        this.uploadedFile = res;
        return;
      },
      err => {
        console.log(err);
      }
    );
  }

  previewFile(file) {
    return this.filestackService.previewFile(file);
  }

  validateSelectedDateTime() {
    if (!this.selectedDate) {
      return;
    }
    const currentDateTime = new Date();
    const selectedDateObj = this.selectedTime ? new Date(`${this.selectedDate} ${this.selectedTime}`) : new Date(`${this.selectedDate}`);

    const m = moment(this.selectedTime, 'HH:mm').format('YYYY-MM-DD hh:mm:ss');
    // console.log('isSame', moment(currentDateTime).isSame(selectedDateObj));
    // console.log('JS', currentDateTime.toISOString(), selectedDateObj.toISOString());

    const diffTime = Math.abs(selectedDateObj.getTime() - currentDateTime.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log('diffDays', diffDays);
    console.log('diffTime', diffTime);
  }

}
