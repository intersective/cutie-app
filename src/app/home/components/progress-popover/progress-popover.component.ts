import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-popover',
  templateUrl: './progress-popover.component.html',
  styleUrls: ['./progress-popover.component.scss']
})
export class ProgressPopoverComponent implements OnInit {

  @Input() progress: any;
  constructor() { }

  ngOnInit() {
  }

}
