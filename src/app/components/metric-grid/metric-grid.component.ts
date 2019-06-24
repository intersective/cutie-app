import { Component, OnInit } from '@angular/core';
import { MetricGridService } from './metric-grid.service';

@Component({
  selector: 'app-metric-grid',
  templateUrl: './metric-grid.component.html',
  styleUrls: ['./metric-grid.component.scss']
})
export class MetricGridComponent implements OnInit {
  submissions: number;
  feedbackLoops: number;
  helpfulnessRating: number;

  constructor(
    private service: MetricGridService
  ) { }

  ngOnInit() {
    this.service.getStatistics().subscribe(response => {
      this.submissions = response.submissions;
      this.feedbackLoops = response.feedbackLoops;
      this.helpfulnessRating = response.helpfulnessRating;
    });
  }

}
