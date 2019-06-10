import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DemoService {
  students = ['Caramel Dundee', 'Gosinder Shah', 'Mein Black', 'Gos Baxter', 'Monday Blighton', 'Joreis Park', 'Dimitry Ricks', 'Desean Ning'];

  constructor() {}

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
/*
  getProgress() {
    let index = this.rows.findIndex(row => {
      return row.progress.length === 0;
    });
    this.rows[index].progress = Array(10).fill({}).map(this._randomProgress).concat(Array(5).fill({
      name: 'assessment name',
      dueDate: '08 Sept 2019 07:00:00',
      submissionDate: '01 Sept 2019 07:00:00',
      status: 'not started',
      overdue: false
    }));
    this.rows = [...this.rows];
    index = this.rows.findIndex(row => {
      return row.progress.length === 0;
    });
    if (index >= 0) {
      setTimeout(() => {
        this.getProgress();
      }, 1000);
    }
  }


  private _randomProgress(x) {
    const status = ['not started', 'in progress', 'done', 'pending review', 'pending approval', 'published'];
    return {
      name: 'assessment name',
      dueDate: '01 Aug 2019 07:00:00',
      submissionDate: Math.random() > 0.3 ? '01 Sept 2019 07:00:00' : '',
      status: status[Math.floor( Math.random() * status.length )],
      overdue: Math.random() > 0.7
    };
  }
*/
}
