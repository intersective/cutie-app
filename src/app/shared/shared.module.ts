import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NavbarComponent } from '@components/navbar/navbar.component';
import { StorageService } from '@services/storage.service';
import { ActionPopoverComponent } from '@components/action-popover/action-popover.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ActionPopoverComponent
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
    StorageService
  ],
  entryComponents: [
    ActionPopoverComponent
  ]
})
export class SharedModule { }
