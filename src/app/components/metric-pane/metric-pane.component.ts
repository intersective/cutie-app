import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-metric-pane',
  templateUrl: './metric-pane.component.html',
  styleUrls: ['./metric-pane.component.scss']
})
export class MetricPaneComponent implements OnInit {
  @Input() value;
  @Input() text;
  constructor() { }

  ngOnInit() {
  }

}
