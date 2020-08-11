import { Injectable } from '@angular/core';
import { RequestService } from '@shared/request/request.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UtilsService } from '@services/utils.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';
import { delay } from 'rxjs/internal/operators';

/**
 * @description list of api endpoint involved in this service
 */
const api = {
  getChatList: 'api/v2/message/chat/list.json',
  getChatMessages: 'api/v2/message/chat/list_messages.json',
  createMessage: 'api/v2/message/chat/create_message',
  markAsSeen: 'api/v2/message/chat/edit_message',
  getTeam: 'api/teams.json'
};

export interface ChatChannel {
  channelId: number | string;
  channelName: string;
  channelAvatar: string;
  pusherChannelName: string;
  readonly: boolean;
  roles: string[];
  members: {
    name: string;
    role: string;
    avatar: string;
  }[];
  unreadMessages: number;
  lastMessage: string;
  lastMessageCreated: string;
}

export interface Message {
  id?: number;
  senderName?: string;
  senderRole?: string;
  senderAvatar?: string;
  isSender?: boolean;
  message: string;
  sentTime?: string;
  channelId?: number | string;
  file?: object;
  preview?: string;
  noAvatar?: boolean;
}
interface NewMessageParam {
  channel_id: number | string;
  message: string;
  env?: string;
  file?: object;
}

interface MessageListParams {
  channel_id: number | string;
  page: number;
  size: number;
}

interface MarkAsSeenParams {
  channel_id: number | string;
  ids: number[];
  action?: string;
}

interface UnreadMessageParams {
  filter: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private request: RequestService,
    private utils: UtilsService,
    private pusherService: PusherService,
    private demo: DemoService
  ) {}

  /**
   * this method return chat list data.
   */
  getChatList(): Observable<ChatChannel[]> {
    if (environment.demo) {
      const response = this.demo.getChats();
      return of(this._normaliseChatListResponse(response.data)).pipe(delay(1000));
    }
    return this.request.get(api.getChatList).pipe(
      map(response => {
        if (response.success && response.data) {
          return this._normaliseChatListResponse(response.data);
        }
      })
    );
  }

  private _normaliseChatListResponse(data): ChatChannel[] {
    if (!Array.isArray(data)) {
      this.request.apiResponseFormatError('Chat format error');
      return [];
    }
    if (data.length === 0) {
      return [];
    }
    const chats = [];
    data.forEach(chat => {
      chats.push({
        channelId: chat.channel_id,
        channelName: chat.channel_name,
        channelAvatar: chat.channel_avatar,
        pusherChannelName: chat.pusher_channel_name,
        readonly: chat.readonly,
        roles: chat.roles,
        members: chat.members,
        unreadMessages: chat.unread_messages,
        lastMessage: chat.last_message,
        lastMessageCreated: chat.last_message_created
      });
    });
    return chats;
  }

  /**
   * this method return message for one chat.
   * @param prams
   *  prams is a json object
   * {
   *  channel_id: 1234,
   *  page: 1,
   *  size:20
   * }
   */
  getMessageList(data: MessageListParams): Observable<Message[]> {
    if (environment.demo) {
      const response = this.demo.getMessages();
      return of(this._normaliseMessageListResponse(response.data)).pipe(delay(1000));
    }
    return this.request
      .get(api.getChatMessages, {
        params: data
      })
      .pipe(
        map(response => {
          if (response.success && response.data) {
            return this._normaliseMessageListResponse(response.data);
          }
        })
      );
  }

  /**
   * modify the message list response
   */
  private _normaliseMessageListResponse(data): Message[] {
    if (!Array.isArray(data)) {
      this.request.apiResponseFormatError('Message array format error');
      return [];
    }
    if (data.length === 0) {
      return [];
    }
    const messageList = [];
    data.forEach(message => {
      messageList.push({
        id: message.id,
        senderName: message.sender.name,
        senderRole: message.sender.role,
        senderAvatar: message.sender.avatar,
        isSender: message.is_sender,
        message: message.message,
        sentTime: message.sent_time,
        file: message.file
      });
    });
    return messageList;
  }

  markMessagesAsSeen(prams: MarkAsSeenParams): Observable<any> {
    const body = {
      channel_id: prams.channel_id,
      id: prams.ids,
      action: 'mark_seen'
    };
    return this.request.post(api.markAsSeen, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  /**
  //  * @name postNewMessage
   * @description post new text message (with text) or attachment (with file)
   */
  postNewMessage(data: NewMessageParam): Observable<any> {
    return this.request.post(api.createMessage, {
      channel_id: data.channel_id,
      message: data.message,
      env: environment.env,
      file: data.file,
    });
  }

  postAttachmentMessage(data: NewMessageParam): Observable<any> {
    if (!data.file) {
      throw new Error('Fatal: File value must not be empty.');
    }
    return this.postNewMessage(data);
  }
}