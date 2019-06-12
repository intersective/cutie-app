import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  currentPage: string;
  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    switch (this.router.url) {
      case '/progress':
        this.currentPage = 'progress';
        break;

      default:
        this.currentPage = 'dashboard';
        break;
    }
  }

  getMyImage() {
    return this.storage.getUser().image ? this.storage.getUser().image : 'https://my.practera.com/img/user-512.png';
  }

  goTo(url) {
    switch (url) {
      case 'progress':
        this.currentPage = 'progress';
        return this.router.navigate(['progress']);
        break;

      default:
        this.currentPage = 'dashboard';
        return this.router.navigate(['dashboard']);
        break;
    }

  }
}
