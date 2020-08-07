import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  channelId: number;
  channelName: string;
  channelAvatar: string;
  pusherChannelName: string;
  readonly: boolean;
  roles: any;
  members: any;

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
    this.channelId = null;
    this.channelName = null;
    this.channelAvatar = null;
    this.pusherChannelName = null;
    this.readonly = null;
    this.roles = [];
    this.members = [];
  }

  goto(event) {
    this.channelId = event.channelId;
    this.channelName = event.channelName;
    this.channelAvatar = event.channelAvatar;
    this.pusherChannelName = event.pusherChannelName;
    this.readonly = event.readonly;
    this.roles = event.roles;
    this.members = event.members;
    setTimeout(() => {
      this.chatRoom.onEnter();
    });
  }

  getCurrentChat() {
    return {
      channelId: this.channelId,
      channelName: this.channelName,
      channelAvatar: this.channelAvatar,
      pusherChannelName: this.pusherChannelName,
      readonly: this.readonly,
      roles: this.roles,
      members: this.members,
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
    if (this.channelId) {
      return;
    }
    // navigate to the first chat
    this.goto({
      channelId: chats[0].channel_id,
      channelName: chats[0].channel_name,
      channelAvatar: chats[0].channel_avatar,
      pusherChannelName: chats[0].pusher_channel_name,
      readonly: chats[0].readonly,
      roles: chats[0].roles,
      members: chats[0].members
    });
  }
}
