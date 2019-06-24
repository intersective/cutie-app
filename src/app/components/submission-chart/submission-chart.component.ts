import { Component, OnInit } from '@angular/core';
import { SubmissionChartService } from './submission-chart.service';

@Component({
  selector: 'app-submission-chart',
  templateUrl: './submission-chart.component.html',
  styleUrls: ['./submission-chart.component.scss'],
})
export class SubmissionChartComponent implements OnInit {
  // the data used to generate the chart
  data: any[];
  constructor(
    private service: SubmissionChartService
  ) { }

  ngOnInit() {
    this.service.getSubmissions().subscribe(response => {
      const series = [];
      response.data.forEach(d => {
        series.push({
          name: d.date,
          value: d.value
        });
      });
      this.data = [{
        name: 'No. of submissions',
        series: series
      }];
    });
  }

}
