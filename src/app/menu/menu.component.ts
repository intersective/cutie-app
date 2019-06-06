import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit() {}

  getMyImage() {
    return this.storage.getUser().image ? this.storage.getUser().image : 'https://my.practera.com/img/user-512.png';
  }

}
