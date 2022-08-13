import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

import { StorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { FilestackService } from '@shared/filestack/filestack.service';

import { ChatService, ChatChannel, Message, MessageListResult } from '../chat.service';

@Component({
  selector: 'app-edit-schedule-message-popup',
  templateUrl: './edit-schedule-message-popup.component.html',
  styleUrls: ['./edit-schedule-message-popup.component.scss'],
})
export class EditScheduleMessagePopupComponent implements OnInit {

  @Input() reScheduled = false;
  @Input() scheduledMessage?: string;
  @Input() channelUuid: string;
  @Input() channelName: string;
  selectedDate: string;
  selectedTime: string;
  message: string;
  sending: boolean;
  invalidDateTime: boolean;
  updateSuccess: boolean;

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
    this.sending = false;
    this.selectedDate = '';
    this.selectedTime = '';
    this.invalidDateTime = false;
    this.updateSuccess = false;
    this.message = this.scheduledMessage ? this.scheduledMessage : null;
  }

  /**
   * This will cloase the group chat popup
   */
  close() {
    let returnData: {} = {
      updateSuccess: false,
      reScheduledData: null,
      newMessageData: null
    };
    if (this.reScheduled && (this.selectedDate && !this.selectedTime)) {
      returnData = {
        updateSuccess: this.updateSuccess,
        reScheduledData: new Date(`${this.selectedDate} ${this.selectedTime}`).toISOString()
      };
    } else {
      returnData = {
        updateSuccess: this.updateSuccess,
        newMessageData: this.message
      };
    }
    this.modalController.dismiss(returnData);
  }

  EditMessage() {
    if (!this.selectedDate || !this.selectedTime || !this.channelUuid) {
      return;
    }
    this.sending = true;
    const dateObj = new Date(`${this.selectedDate} ${this.selectedTime}`);
    if (this.isValidDateTime(`${this.selectedDate} ${this.selectedTime}`)) {
      const editMessageParam = {
        uuid: this.channelUuid,
        message: this.scheduledMessage,
        scheduled: dateObj.toISOString()
      };
      if (this.reScheduled) {
        delete editMessageParam.message;
      }
      this.chatService.editChatMesage(editMessageParam).subscribe(
        response => {
          this.updateSuccess = true;
          this.sending = false;
        },
        error => {
          console.log(error);
          this.sending = false;
        }
      );
    } else {
      this.sending = false;
    }
  }

    /**
   * this method will check is selected date and time valid.
   * - we are not allow to select previous date and time.
   * - selected time at least should be 30 minutes in future to be valid.
   * @param selectedDateTime date time user select to schedule the message
   * @returns boolean
   */
     isValidDateTime(selectedDateTime) {
      if (!selectedDateTime) {
        return;
      }
      const dateTimeDiff = this.utils.getDateDifferenceInMinutes(selectedDateTime);
      if (dateTimeDiff >= 30) {
        this.invalidDateTime = false;
        return true;
      } else {
        this.invalidDateTime = true;
        return false;
      }
    }

}
