import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NavbarComponent } from '@components/navbar/navbar.component';
import { ElsaGhostComponent } from '@components/elsa-ghost/elsa-ghost.component';
import { StorageService } from '@services/storage.service';

@NgModule({
  declarations: [
    NavbarComponent,
    ElsaGhostComponent
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
    ElsaGhostComponent
  ],
  providers: [
    StorageService
  ]
})
export class SharedModule { }
