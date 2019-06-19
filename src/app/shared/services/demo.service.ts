import { Injectable } from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class DemoService {
  students = ['Caramel Dundee', 'Gosinder Shah', 'Mein Black', 'Gos Baxter', 'Monday Blighton', 'Joreis Park', 'Dimitry Ricks', 'Desean Ning'];
  allStatus = ['not started', 'in progress', 'done', 'pending review', 'pending approval', 'published'];
  teams = ['Project1', 'Project2', 'Project3'];

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
        Timelines: [
          {
            Enrolment: {},
            Program: {name: 'Program 1'},
            Project: {},
            Timeline: {}
          },
          {
            Enrolment: {},
            Program: {name: 'Program 2'},
            Project: {},
            Timeline: {}
          },
          {
            Enrolment: {},
            Program: {name: 'Program 3'},
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
      total: 50,
      data: this._studentNames()
    }
  }

  private _studentNames() {
    const enrolments = [];
    this._shuffle(this.students).forEach((st, i) => {
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
      return 'Project 1';
    }
    if (Math.random() < 0.6) {
      return 'Project 2';
    }
    return 'Project 3';
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

  private _randomProgress(x = null) {
    const status = this.allStatus[Math.floor( Math.random() * this.allStatus.length )];
    return {
      name: 'assessment name',
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
    const n = Math.random() > 0.5 ? 3 : 2;
    Array(n).fill(1).forEach((x, i) => {
      members.push({
        name: this.students[i],
        image: './assets/demo/avatar.png'
      })
    });
    return members;
  }

}
