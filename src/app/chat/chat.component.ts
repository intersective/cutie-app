import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatChannel } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  chatChannel: ChatChannel;

  @ViewChild('chatList', { static: true }) chatList;
  @ViewChild('chatRoom', { static: false }) chatRoom;
  constructor() { }

  ngOnInit() {
    this._initialise();
    setTimeout(() => {
      this.chatList.onEnter();
    });
  }
  private _initialise() {
    this.chatChannel = null;
  }

  goto(event) {
    this.chatChannel = event;
    setTimeout(() => {
      this.chatRoom.onEnter();
    });
  }

  /**
   * this method call when chat-list component finished loading chat objects.
   * from this method we loading first chat to chat room component.
   * @param chats chat list Array
   * if we have teamId we are not doing any thing, that means we have already load first chat.
   * if we didn't have teamId we will goto() method by passing first chat channel data. to load chat.
   */
  selectFirstChat(chats) {
    if (this.chatChannel) {
      return ;
    }
    // navigate to the first chat
    this.goto(chats[0]);
  }
}
