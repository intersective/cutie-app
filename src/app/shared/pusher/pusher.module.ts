import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PusherService } from './pusher.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [PusherService]
})
export class PusherModule {
  constructor(@Optional() @SkipSelf() parentModule: PusherModule) {
    if (parentModule) {
      throw new Error(
        'PusherModule is already loaded. Import it in the AppModule only');
    }
  }

}
