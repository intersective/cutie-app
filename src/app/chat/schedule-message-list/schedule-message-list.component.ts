import { Component, OnInit, Input } from '@angular/core';

import { ChatService, ChatChannel, Message, MessageListResult } from '../chat.service';

@Component({
  selector: 'app-schedule-message-list',
  templateUrl: './schedule-message-list.component.html',
  styleUrls: ['./schedule-message-list.component.scss'],
})
export class ScheduleMessageListComponent implements OnInit {

  @Input() channelUuid: string;
  @Input() channelName: string;

    // message history list
    messageList: Message[] = [];
    messagePageCursor = '';
    messagePageSize = 20;
    loadingScheduleMessages = false;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this._initialise();
    this._loadMessages();
  }

  private _initialise() {
    this.messageList = [];
    this.loadingScheduleMessages = false;
    this.messagePageCursor = '';
    this.messagePageSize = 20;
  }

  private _loadMessages() {
    // if one chat request send to the api. not calling other one.
    // because in some cases second api call respose return before first one.
    // then messages getting mixed.
    if (this.loadingScheduleMessages) {
      return;
    }
    this.loadingScheduleMessages = true;
    this.chatService
      .getMessageList({
        channelUuid: this.channelUuid,
        cursor: this.messagePageCursor,
        size: this.messagePageSize,
        scheduledOnly: true
      })
      .subscribe(
        (messageListResult: MessageListResult) => {
          console.log('messageListResult', messageListResult);
          if (!messageListResult) {
            this.loadingScheduleMessages = false;
            return;
          }
          const messages = messageListResult.messages;
          if (messages.length === 0) {
            this.loadingScheduleMessages = false;
            return;
          }
          this.messagePageCursor = messageListResult.cursor;
          this.loadingScheduleMessages = false;
          if (this.messageList.length > 0) {
            this.messageList = messages.concat(this.messageList);
          } else {
            this.messageList = messages;
          }
        },
        error => {
          this.loadingScheduleMessages = false;
        }
      );
  }

}
