import { Injectable } from '@angular/core';
import { RequestService } from '@shared/request/request.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UtilsService } from '@services/utils.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';
import { delay } from 'rxjs/internal/operators';
import { StorageService } from '@services/storage.service';

/**
 * @description list of api endpoint involved in this service
 */
const api = {
  getChatList: 'api/v2/message/chat/list.json',
  getChatMessages: 'api/v2/message/chat/list_messages.json',
  createMessage: 'api/v2/message/chat/create_message',
  markAsSeen: 'api/v2/message/chat/edit_message',
  createChannel: 'api/v2/message/chat/create_channel',
  deleteChannel: 'api/v2/message/chat/delete_channel',
  editChannel: 'api/v2/message/chat/edit_channel'
};

export interface ChatChannel {
  channelId: number | string;
  channelName: string;
  channelAvatar: string;
  pusherChannelName: string;
  readonly?: boolean;
  announcement?: boolean;
  roles: string[];
  members: {
    name: string;
    role: string;
    avatar: string;
  }[];
  canEdit: boolean;
  unreadMessages?: number;
  lastMessage?: string;
  lastMessageCreated?: string;
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
  channelIdAlias?: string;
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

interface EditChannelParams {
  channel_id: number | string;
  channel_name?: string;
  announcement?: boolean;
  roles?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private request: RequestService,
    private utils: UtilsService,
    private pusherService: PusherService,
    private demo: DemoService,
    public storage: StorageService,
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
        announcement: chat.announcement,
        roles: chat.roles,
        members: chat.members,
        canEdit: chat.can_edit,
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
      const response = this.demo.getMessages(data);
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
    if (environment.demo) {
      return of({}).pipe(delay(1000));
    }
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
    if (environment.demo) {
      const response = this.demo.getNewMessage(data);
      return of(this._normalisePostMessageResponse(response.data)).pipe(delay(1000));
    }
    return this.request.post(api.createMessage, {
      channel_id: data.channel_id,
      message: data.message,
      env: environment.env,
      file: data.file,
    })
    .pipe(
      map(response => {
        if (response.success && response.data) {
          return this._normalisePostMessageResponse(response.data);
        }
      })
    );
  }

  private _normalisePostMessageResponse(data): { message: Message, channelId?: number } {
    if (!this.utils.has(data, 'id') ||
        !this.utils.has(data, 'sender.name') ||
        !this.utils.has(data, 'sender.role') ||
        !this.utils.has(data, 'sender.avatar') ||
        !this.utils.has(data, 'is_sender') ||
        !this.utils.has(data, 'message') ||
        !this.utils.has(data, 'sent_time') ||
        !this.utils.has(data, 'file')) {
      this.request.apiResponseFormatError('chat channel format error');
      return null;
    }
    return {
      message: {
        id: data.id,
        senderName: data.sender.name,
        senderRole: data.sender.role,
        senderAvatar: data.sender.avatar,
        isSender: data.is_sender,
        message: data.message,
        sentTime: data.sent_time,
        file: data.file
      },
      channelId: data.channel ? data.channel.channel_id : null
    };
  }

  postAttachmentMessage(data: NewMessageParam): Observable<any> {
    if (!data.file) {
      throw new Error('Fatal: File value must not be empty.');
    }
    return this.postNewMessage(data);
  }

    /**
   * this method create new cohort channel.
   */
  createChannel(data): Observable<ChatChannel> {
    if (environment.demo) {
      const response = this.demo.getNewChannel();
      return of(this._normaliseCreateChannelResponse(response.data)).pipe(delay(1000));
    }
    return this.request.post(api.createChannel, {
      name: data.name,
      announcement: data.announcement,
      roles: data.roles,
      members: data.members
    }).pipe(
      map(response => {
        if (response.success && response.data) {
          return this._normaliseCreateChannelResponse(response.data);
        }
      })
    );
  }

  private _normaliseCreateChannelResponse(data): ChatChannel {
    if (!this.utils.has(data, 'channel_id') ||
        !this.utils.has(data, 'channel_name') ||
        !this.utils.has(data, 'channel_avatar') ||
        !this.utils.has(data, 'pusher_channel_name') ||
        !this.utils.has(data, 'roles') ||
        !this.utils.has(data, 'members') ||
        !this.utils.has(data, 'can_edit')) {
      this.request.apiResponseFormatError('chat channel format error');
      return null;
    }
    return {
      channelId: data.channel_id,
      channelName: data.channel_name,
      channelAvatar: data.channel_avatar,
      pusherChannelName: data.pusher_channel_name,
      announcement: data.announcement,
      roles: data.roles,
      members: data.members,
      canEdit: data.can_edit
    };
  }

  deleteChatChannel(channelId) {
    if (environment.demo) {
      return of({}).pipe(delay(1000));
    }
    return this.request.delete(api.deleteChannel, {
      id: channelId
    });
  }

  editChatChannel(data: EditChannelParams) {
    if (environment.demo) {
      const response = this.demo.getEditedChannel(data);
      return of(response.data).pipe(delay(1000));
    }
    return this.request.post(api.editChannel, {
      id: data.channel_id,
      name: data.channel_name,
      announcement: data.announcement,
      roles: data.roles
    });
  }

}
