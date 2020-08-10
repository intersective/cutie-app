import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NavbarComponent } from '@components/navbar/navbar.component';
import { StorageService } from '@services/storage.service';
import { ActionPopoverComponent } from '@components/action-popover/action-popover.component';
import { FilestackService } from './filestack/filestack.service';
import { PreviewComponent } from './filestack/preview/preview.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ActionPopoverComponent,
    PreviewComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NavbarComponent,
    ActionPopoverComponent
  ],
  providers: [
    StorageService,
    FilestackService
  ],
  entryComponents: [
    ActionPopoverComponent,
    PreviewComponent
  ]
})
export class SharedModule { }
