import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    public utils: UtilsService,
  ) {
  }

  ngOnInit() {
  }

}
