import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ClickableItemComponent } from '../components/clickable-item/clickable-item.component';
import { ChatService } from './chat.service';

@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatRoomComponent,
    ClickableItemComponent
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
  providers: [ChatService],
})
export class ChatModule { }
