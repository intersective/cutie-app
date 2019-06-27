import { Component, OnInit } from '@angular/core';
import { SubmissionChartService } from './submission-chart.service';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-submission-chart',
  templateUrl: './submission-chart.component.html',
  styleUrls: ['./submission-chart.component.scss'],
})
export class SubmissionChartComponent implements OnInit {
  // the data used to generate the chart
  data: any[];
  max: number;
  firstDay: string;
  lastDay: string;
  constructor(
    private service: SubmissionChartService,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.service.getSubmissions().subscribe(response => {
      const series = [];
      response.data.forEach(d => {
        series.push({
          name: this.utils.utcToLocal(d.date, 'date'),
          value: d.value
        });
      });
      this.data = [{
        name: 'No. of submissions',
        series: series
      }];
      this.max = response.max;
      this.firstDay = series[0].name;
      this.lastDay = series[series.length - 1].name;
    });
  }

}
