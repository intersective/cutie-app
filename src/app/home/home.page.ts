import { Component, OnInit } from '@angular/core';
import { HomeService, Enrolment } from './home.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { UtilsService } from '@services/utils.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  enrolments: Array<Enrolment> = [];
  rows = [];
  selected = [];

  constructor(
    private homeService: HomeService,
    private pusher: PusherService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.pusher.initialisePusher();
    this.homeService.getEnrolments().subscribe(response => {
      this.enrolments = response.data;
      this._updateEnrolments();
    });
    this.utils.getEvent('student-progress').subscribe(event => {

    });
  }

  /**
   * Update the datatable row based on enrolment data
   */
  private _updateEnrolments() {
    const rows = [];
    this.enrolments.forEach(enrolment => {
      rows.push({
        uid: enrolment.userUid,
        student: enrolment.name,
        progress: [
          {
              "due_date": "2018-09-08 07:00:00",
              "status": "published",
              "overdue": false
          },
          {
              "due_date": "2018-09-08 07:00:00",
              "status": "in progress",
              "overdue": true
          },
          {
              "due_date": "2018-09-08 07:00:00",
              "status": "done",
              "overdue": false
          },
          {
              "due_date": "2018-09-08 07:00:00",
              "status": "pending review",
              "overdue": true
          },
          {
              "due_date": "2019-09-08 07:00:00",
              "status": "not started",
              "overdue": false
          },
          {
              "due_date": "2019-09-08 07:00:00",
              "status": "not started",
              "overdue": false
          }
        ],
        action: '...'
      });
    });
    // trigger the data table detection
    this.rows = rows;
  }

  isOverDue(date: string) {
    return this.utils.timeComparer(date) <= 0;
  }

}
