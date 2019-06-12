import { Injectable } from '@angular/core';
import { UtilsService } from '@services/utils.service';

@Injectable({
  providedIn: 'root'
})

export class DemoService {
  students = ['Caramel Dundee', 'Gosinder Shah', 'Mein Black', 'Gos Baxter', 'Monday Blighton', 'Joreis Park', 'Dimitry Ricks', 'Desean Ning'];
  allStatus = ['not started', 'in progress', 'done', 'pending review', 'pending approval', 'published'];

  constructor(
    private utils: UtilsService
  ) {}

  // auth.service
  directLogin() {
    return {
      data: {
        apikey: 'demo-apikey',
        Timelines: [
          {
            Enrolment: {},
            Program: {},
            Project: {},
            Timeline: {}
          }
        ]
      }
    };
  }

  // auth.service
  getMyInfo() {
    return {
      data: {
        User: {
          name: 'Demo Coordinator',
          contactNumber: '0123456789',
          email: 'coordinator@practera.com',
          role: 'coordinator',
          image: './assets/demo/avatar.png',
          userHash: 'demo-hash'
        }
      }
    }
  }

  // progress-table.service
  getEnrolments() {
    setTimeout(
      () => {
        // get progress after 2 seconds
        this._getProgress();
      },
      2000
    );
    return {
      total: 20,
      data: this._studentNames()
    }
  }

  private _studentNames() {
    const enrolments = [];
    this.students.forEach((st, i) => {
      enrolments.push({
        name: st,
        participant_email: 'user' + i + '@practera.com',
        user_uid: 'demo-uid-' + i,
        team_name: this._randomTeam(),
        image: './assets/demo/avatar.png'
      });
    });
    return enrolments;
  }

  private _randomTeam() {
    if (Math.random() < 0.4) {
      return 'Team 1';
    }
    if (Math.random() < 0.6) {
      return 'Team 2';
    }
    return null;
  }

  private _getProgress() {
    this.students.forEach((st, i) => {
      setTimeout(() => {
        this.utils.broadcastEvent('student-progress', {
          user_uid: 'demo-uid-' + i,
          progress: Array(10).fill({}).map(this._randomProgress, this).concat(Array(5).fill({
            name: 'assessment name',
            due_date: '08 Sept 2019 07:00:00',
            submitted: '',
            status: 'not started',
            overdue: false
          }))
        });
      }, 1000 * i);
    });
  }

  private _randomProgress(x) {
    const status = this.allStatus[Math.floor( Math.random() * this.allStatus.length )];
    return {
      name: 'assessment name',
      due_date: '01 Aug 2019 07:00:00',
      submitted: ['not started', 'in progress'].includes(status) ? '' : '01 Jun 2019 07:00:00',
      status: status,
      overdue: Math.random() > 0.7
    };
  }

}
