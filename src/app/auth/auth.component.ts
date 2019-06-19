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
    if (!token) {
      return this._error();
    }
    this.authService.directLogin(token).subscribe(
      res => {
        this.router.navigate(['dashboard']);
      },
      err => {
        this._error();
      }
    );
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
