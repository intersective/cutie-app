import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UtilsService } from '@services/utils.service';
import { StorageService } from '@services/storage.service';
import { PusherService } from '@shared/pusher/pusher.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private router: Router,
    public utils: UtilsService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    private pusherService: PusherService,
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.utils.getIpLocation();
    let searchParams = null;
    let queryString = '';
    if (window.location.search) {
      queryString =  window.location.search.substring(1);
    } else if (window.location.hash) {
      queryString = window.location.hash.substring(2);
    }
    searchParams = new URLSearchParams(queryString);

    if (searchParams.has('do')) {
      switch (searchParams.get('do')) {
        case 'secure':
          if (searchParams.has('auth_token')) {
            const queries = this.utils.urlQueryToObject(queryString);
            return this.router.navigate(['auth', searchParams.get('auth_token'), queries]);
          }
          break;
      }
    }

    if (searchParams.has('jwt')) {
      const queries = this.utils.urlQueryToObject(queryString);
      return this.router.navigate(['auth/jwt', searchParams.get('jwt'), queries]);
    }
  }

  initializeApp() {
    this.platform.ready().then(async() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // initialise Pusher
      await this.pusherService.initialise();
    });
  }
}
