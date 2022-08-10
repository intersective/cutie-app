import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    ScheduleMessageListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatComponent
      }
    ])
  ],
  exports: [
    ChatComponent,
    ChatListComponent,
    ChatRoomComponent,
  ],
  entryComponents: [ChatPreviewComponent, ChatInfoComponent, DirectChatComponent, AnnouncementChatPopupComponent, GroupChatPopupComponent],
  providers: [ChatService],
})
export class ChatModule { }
