import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MessageComponent } from './message.component';
import { ActionPopoverComponent } from '@components/action-popover/action-popover.component';

@NgModule({
  declarations: [
    MessageComponent,
    ActionPopoverComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MessageComponent
      }
    ]),
  ],
  entryComponents: [
    ActionPopoverComponent
  ]
})
export class MessageModule { }
