import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    // auth token login
    if (token) {
      return this.authService.directLogin(token).subscribe(
        res => this._handleRedirection(),
        err => this._error()
      );
    }

    const jwt = this.route.snapshot.paramMap.get('jwt');
    // jwt login
    if (jwt) {
      return this.authService.jwtLogin(jwt).subscribe(
        res => this._handleRedirection(),
        err => this._error()
      );
    }
    return this._error();
  }

  private _handleRedirection() {
    const redirect = this.route.snapshot.paramMap.get('redirect');
    switch (redirect) {
      case 'progress-only':
        this.router.navigate(['progress-only']);
        break;
      case 'chat-only':
        this.router.navigate(['chat-only']);
        break;
      case 'overview-only':
        this.router.navigate(['overview-only']);
        break;
      default:
        this.router.navigate(['dashboard']);
        break;
    }
  }

  private _error() {
    this.notificationService.alert({
      message: 'Your link is invalid or expired.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/error']);
          }
        }
      ]
    });
  }
}
