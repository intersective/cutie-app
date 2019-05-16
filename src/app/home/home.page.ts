import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  rows = [];
  selected = [];

  constructor(
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.homeService.getEnrolments().subscribe(enrolments => {
      enrolments.data.forEach(enrolment => {
        this.rows.push({
          student: enrolment.name,
          progress: 0.5,
          action: '...'
        });
      });
      // trigger the data table detection
      this.rows = [...this.rows];
    });
  }
}
