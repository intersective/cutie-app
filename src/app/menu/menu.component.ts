import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit() {}

  getMyImage() {
    return this.storage.getUser().image ? this.storage.getUser().image : 'https://my.practera.com/img/user-512.png';
  }

  goTo(url) {
    switch (url) {
      case 'progress':
        return this.router.navigate(['progress']);
        break;

      default:
        return this.router.navigate(['dashboard']);
        break;
    }

  }
}
