import { Injectable } from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class DemoService {
  students = ['Caramel Dundee', 'Gosinder Shah', 'Mein Black', 'Gos Baxter', 'Monday Blighton', 'Joreis Park', 'Dimitry Ricks', 'Desean Ning'];
  allStatus = ['not started', 'in progress', 'done', 'pending review', 'pending approval', 'published'];
  teams = ['team 1 - market research analysis project', 'team 2 - market research analysis project', 'team 3 - market research analysis project', 'team 4 - market research analysis project'];
  totalSubmission;

  constructor(
    private utils: UtilsService,
    private storage: StorageService
  ) {}

  // auth.service
  directLogin() {
    const expire = new Date();
    expire.setHours(expire.getHours() + 1);
    this.storage.set('expire', expire.toString());
    return {
      data: {
        apikey: 'demo-apikey',
        timeline_id: 2,
        program_id: 2,
        Timelines: [
          {
            Enrolment: {},
            Program: {name: 'Program 1'},
            Project: {},
            Timeline: {id: 1}
          },
          {
            Enrolment: {},
            Program: {name: 'Program 2'},
            Project: {},
            Timeline: {id: 2}
          },
          {
            Enrolment: {},
            Program: {name: 'Program 3'},
            Project: {},
            Timeline: {id: 3}
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
      total: 50,
      data: this._getStudents()
    }
  }

  private _getStudents() {
    const enrolments = [];
    this._shuffle(this.students).forEach((st, i) => {
      enrolments.push({
        name: st,
        participant_email: 'user' + i + '@practera.com',
        user_uid: 'demo-uid-' + i,
        team_name: this._randomTeam(),
        image: './assets/demo/avatar.png',
        progress: Array(10).fill({}).map(this._randomProgress, this).concat(Array(5).fill({
          name: 'assessment name',
          due_date: '08 Sept 2019 07:00:00',
          submitted: '',
          status: 'not started',
          overdue: false
        }))
      });
    });
    return enrolments;
  }

  private _randomTeam() {
    if (Math.random() < 0.4) {
      return this.teams[0];
    }
    if (Math.random() < 0.6) {
      return this.teams[1];
    }
    return this.teams[2];
  }

  private _randomProgress(x = null) {
    const status = this.allStatus[Math.floor( Math.random() * this.allStatus.length )];
    return {
      name: 'Project Findings Report - Draft, Project Findings Report - Draft',
      due_date: '01 Aug 2019 07:00:00',
      submitted: ['not started', 'in progress'].includes(status) ? '' : '01 Jun 2019 07:00:00',
      status: status,
      overdue: Math.random() > 0.7
    };
  }

  private _shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // progress-table.service
  getTeams() {
    let data = [];
    this.teams.forEach((team, i) => {
      data.push({
        uid: 'team' + i,
        name: team,
        progress: Array(3).fill({}).map(this._randomProgress, this).concat(Array(2).fill({
          name: 'assessment name',
          due_date: '08 Sept 2019 07:00:00',
          submitted: '',
          status: 'not started',
          overdue: false
        })),
        members: this._getMembers(i)
      });
    });
    return {
      data: data,
      total: 10
    }
  }

  private _getMembers(i) {
    let members = [];
    const n = Math.floor(Math.random() * 5 + 5);
    Array(n).fill(1).forEach((x, i) => {
      members.push({
        name: this.students[i],
        image: './assets/demo/avatar.png'
      })
    });
    return members;
  }

  // menu.service
  public getJwt(timelineId) {
    return {
      data: {
        apikey: 'demo-apikey-' + timelineId,
        timeline_id: timelineId,
        program_id: timelineId
      }
    }
  }

  // metric-grid.service
  public getStatistics() {
    this.totalSubmission = Math.floor(Math.random() * 50 + 80);
    return {
      data: {
        total_submissions: this.totalSubmission,
        feedback_loops: Math.floor(Math.random() * 40 + 40),
        helpfulness_rating: Math.floor(Math.random() * 5 + 5).toFixed(1)
      }
    };
  }

  // submission-chart.service
  public getSubmissions() {
    let date = new Date('2019-04-01');
    let value = 0;
    let data = [];
    for (let i = 0; i < 8; i++) {
      const month = date.getMonth() + 1;
      data.push({
        date: date.getFullYear() + '-' + month + '-' + date.getDate(),
        value: value
      });
      value += Math.floor(Math.random() * 20 + 5);
      date.setDate(date.getDate() + 7);
    }
    data[data.length - 1].value = this.totalSubmission;
    return {
      data: {
        submissions: {
          data: data,
          max: 140
        }
      }
    };
  }
}
