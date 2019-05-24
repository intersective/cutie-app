import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [ MenuComponent ],
  imports: [
    SharedModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
