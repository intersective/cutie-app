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
    public utils: UtilsService
  ) {
    this.utils.getEvent('student-progress').subscribe(event => {
      const index = this.rows.findIndex(row => {
        return row.uid === event.user_uid
      });
      this.rows[index].progress = event.progress;
      this.rows = [...this.rows];
    });
  }

  ngOnInit() {
    this.pusher.initialisePusher();
    this.homeService.getEnrolments().subscribe(response => {
      this.enrolments = response.data;
      this._updateEnrolments();
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
        progress: [],
        action: '...'
      });
    });
    // trigger the data table detection
    this.rows = rows;
  }

  isOverDue(date: string) {
    return this.utils.timeComparer(date) <= 0;
  }

  progressWidth(x) {
    return Math.floor(100/x);
  }
}
