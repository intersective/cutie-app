import { Component, OnInit, Input } from '@angular/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() type: string;
  @Input() data: any[];
  @Input() legendTitle: string;
  @Input() yScaleMax: string;
  curve = shape.curveBasis;
  colorScheme = {
    domain: [
      '#2bbfd4'
    ]
  };
  constructor() { }

  ngOnInit() {
  }

}