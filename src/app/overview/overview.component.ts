import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

  checkModel: any = { left: false, middle: true, right: false };

  constructor() { }

  ngOnInit() {}

}
