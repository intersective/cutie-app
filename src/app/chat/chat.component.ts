import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  teamMemberId: Number;
  participantsOnly: boolean;
  teamId: Number;
  chatName: string;
  channelId: number;

  @ViewChild('chatList') chatList;
  @ViewChild('chatRoom') chatRoom;
  constructor() { }

  ngOnInit() {
    this._initialise();
    setTimeout(() => {
      this.chatList.onEnter();
    });
  }
  private _initialise() {
    this.teamMemberId = null;
    this.participantsOnly = null;
    this.teamId = null;
    this.chatName = null;
    this.channelId = null;
  }

  goto(event) {
    this.teamId = event.teamId;
    this.teamMemberId = event.teamMemberId ? event.teamMemberId : null;
    this.participantsOnly = event.participantsOnly ? event.participantsOnly : false;
    this.chatName = event.chatName;
    this.channelId = event.channelId;
    setTimeout(() => {
      this.chatRoom.onEnter();
    });
  }

  getCurrentChat() {
    return {
      teamId: this.teamId,
      chatName: this.chatName,
      teamMemberId: this.teamMemberId,
      participantsOnly: this.participantsOnly,
      channelId: this.channelId
    };
  }

  /**
   * this method call when chat-list component finished loading chat objects.
   * from this method we loading first chat to chat room component.
   * @param chats chat list Array
   * if we have teamId we are not doing any thing, that means we have already load first chat.
   * if we didn't have teamId we will goto() method by passing first chat channel data. to load chat.
   */
  selectFirstChat(chats) {
    if (this.teamId) {
      return;
    }
    // navigate to the first chat
    this.goto({
      teamId: chats[0].team_id,
      teamMemberId: chats[0].team_member_id,
      participantsOnly: chats[0].participants_only,
      chatName: chats[0].name,
      channelId: chats[0].channel_id
    });
  }
}
