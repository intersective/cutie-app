import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuillConfig, QuillModule } from 'ngx-quill';

import { SharedModule } from '@shared/shared.module';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatPreviewComponent } from './chat-preview/chat-preview.component';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { ClickableItemComponent } from '../components/clickable-item/clickable-item.component';
import { ChatService } from './chat.service';
import { DirectChatComponent } from './direct-chat/direct-chat.component';
import { AnnouncementChatPopupComponent } from './announcement-chat-popup/announcement-chat-popup.component';
import { GroupChatPopupComponent } from './group-chat-popup/group-chat-popup.component';
import { ScheduleMessageListComponent } from './schedule-message-list/schedule-message-list.component';
import { ScheduleMessagePopupComponent } from './schedule-message-popup/schedule-message-popup.component';
import { EditScheduleMessagePopupComponent } from './edit-schedule-message-popup/edit-schedule-message-popup.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatRoomComponent,
    ChatPreviewComponent,
    ChatInfoComponent,
    ClickableItemComponent,
    DirectChatComponent,
    AnnouncementChatPopupComponent,
    GroupChatPopupComponent,
    ScheduleMessageListComponent,
    ScheduleMessagePopupComponent,
    EditScheduleMessagePopupComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatComponent
      }
    ]),
    QuillModule.forRoot(
      {
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }], ['link']]
        }
      }
    )
  ],
  exports: [
    ChatComponent,
    ChatListComponent,
    ChatRoomComponent,
  ],
  entryComponents: [
    ChatPreviewComponent,
    ChatInfoComponent,
    DirectChatComponent,
    AnnouncementChatPopupComponent,
    GroupChatPopupComponent,
    ScheduleMessagePopupComponent,
    EditScheduleMessagePopupComponent],
  providers: [ChatService],
})
export class ChatModule { }
