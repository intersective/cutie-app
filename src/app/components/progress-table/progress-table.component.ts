import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ProgressTableService, Enrolment, Team } from './progress-table.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { UtilsService } from '@services/utils.service';
import { PopoverController } from '@ionic/angular';
import { ProgressPopoverComponent } from '@components/progress-popover/progress-popover.component';
import { ActionPopoverComponent } from '@components/action-popover/action-popover.component';

@Component({
  selector: 'app-progress-table',
  templateUrl: './progress-table.component.html',
  styleUrls: ['./progress-table.component.scss'],
})
export class ProgressTableComponent implements OnInit {
  rows = [];
  limit = 10;
  offset = 0;
  // sorted by progress
  sorted = null;
  // total number of records
  count = 0;
  // is getting data or not
  loading = false;
  // type of progress table
  type = 'student';
  // progress array
  progresses = [];
  // whether display search bar or not
  searching = false;
  // the value of the search bar
  filter = '';
  @ViewChildren('progressRef', {read: ElementRef}) progressRefs: QueryList<ElementRef>;

  // current page number
  pageNumber = 1;

  constructor(
    private service: ProgressTableService,
    private pusher: PusherService,
    public utils: UtilsService,
    public popoverController: PopoverController
  ) {
    this.utils.getEvent('student-progress').subscribe(event => {
      let index = this.rows.findIndex(row => {
        return row.uid === event.user_uid;
      });
      // store the progress if the row data is not ready yet
      if (index < 0) {
        return this.progresses.push(event);
      }
      this.rows[index].progress = event.progress;
      // retrive any stored progress data and display them
      this.progresses.forEach(progress => {
        index = this.rows.findIndex(row => {
          return row.uid === progress.user_uid;
        });
        this.rows[index].progress = progress.progress;
      });
      this.progresses = [];
      this.rows = [...this.rows];
    });
  }

  ngOnInit() {
    // don't need Pusher anymore
    // this.pusher.initialisePusher();
    this.type = 'student';
    this.getEnrolments();
  }

  initialise() {
    this.limit = 10;
    this.offset = 0;
    this.sorted = null;
    this.filter = '';
    this.rows = [];
    this.pageNumber = 1;
  }

  getEnrolments() {
    this.loading = true;
    // don't need Pusher anymore
    // try to get the enrolment data only if pusher is ready
    // if (!this.pusher.channels.notification) {
    //   setTimeout(() => {
    //     this.getEnrolments();
    //   }, 500);
    //   return ;
    // }
    this.service.getEnrolments(this.offset, this.limit, this.sorted, this.filter).subscribe(response => {
      this.count = response.total;
      this._updateEnrolments(response.data);
      this.loading = false;
    });
  }

  /**
   * Update the datatable row based on enrolment data
   */
  private _updateEnrolments(enrolments: Array<Enrolment>) {
    const rows = [];
    enrolments.forEach(enrolment => {
      rows.push({
        uid: enrolment.userUid,
        student: {
          name: enrolment.name,
          email: enrolment.email,
          image: enrolment.image
        },
        team: enrolment.teamName,
        progress: enrolment.progress ? enrolment.progress : [],
      });
    });
    // trigger the data table detection
    this.rows = rows;
  }

  getTeams() {
    this.loading = true;
    this.service.getTeams(this.offset, this.limit, this.sorted, this.filter).subscribe(response => {
      this.count = response.total;
      this._updateTeams(response.data);
      this.loading = false;
    });
  }

  /**
   * Update the datatable row based on enrolment data
   */
  private _updateTeams(teams: Array<Team>) {
    const rows = [];
    teams.forEach(team => {
      rows.push({
        uid: team.uid,
        name: team.name,
        members: team.members,
        progress: team.progress
      });
    });
    // trigger the data table detection
    this.rows = rows;
  }

  /**
   * switch between student progress and project progress
   */
  switchType() {
    if (this.type === 'student') {
      this.type = 'team';
    } else {
      this.type = 'student';
    }
    this.initialise();
    this._updateData();
  }

  /**
   * Update data based on the type of the progress table
   */
  private _updateData() {
    if (this.type === 'student') {
      this.getEnrolments();
    } else {
      this.getTeams();
    }
  }

  /**
   * filter the data based on value in search bar, will be invoked from outside of this component (navbar)
   */
  search(value) {
    this.filter = value;
    this.offset = 0;
    this._updateData();
  }

  /**
   * Go to the next/any page
   */
  page(event) {
    if (event.page > this.pageNumber) {
      this.offset = event.page - this.pageNumber;
    } else {
      this.offset = event.page - 1;
    }
    this._updateData();
  }

  /**
   * Sort the table by progress
   */
  sort(event) {
    if (event.sorts[0].dir === 'asc') {
      this.sorted = 'progress';
    } else {
      this.sorted = '-progress';
    }
    this.offset = 0;
    this._updateData();
  }

  /**
   * check if this date is overdue
   */
  isOverDue(date: string) {
    return this.utils.timeComparer(date) <= 0;
  }

  /**
   * When user click on an assessment progress
   */
  async progressPopover(ev: any, progress) {
    const popover = await this.popoverController.create({
      component: ProgressPopoverComponent,
      event: ev,
      componentProps: {
        progress: progress
      },
      mode: 'ios',
      cssClass: 'popover-progress'
    });
    return await popover.present();
  }

  /**
   * When user click on the action button
   */
  async actionPopover(ev: any, uid) {
    if (this.type !== 'student') {
      return;
    }
    const popover = await this.popoverController.create({
      component: ActionPopoverComponent,
      event: ev,
      componentProps: {
        actions: [
          {
            text: 'impersonate',
            data: {
              uid: uid
            }
          }
        ]
      },
      cssClass: 'popover-action'
    });
    // handle actions
    popover.onWillDismiss().then(data => {
      if (!data.data) {
        return;
      }
      console.log(data);
    });
    return await popover.present();
  }

  /**
   * Calculate the width percentage for each progress cell
   * @param x number of progress cells
   */
  progressWidth(x) {
    return (100 / x - 0.1).toFixed(2);
  }

  /**
   * When scrolling the progress left/right
   * @param scrollLeft Scrolled to which position
   */
  scroll(scrollLeft) {
    this.progressRefs.toArray().forEach(progressRef => {
      progressRef.nativeElement.scrollTo({left: scrollLeft});
    });
  }

  showTooltip(projectName: string) {
    return projectName.length > 13 ? projectName : '';
  }

}
