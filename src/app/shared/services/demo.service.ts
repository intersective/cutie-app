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
  todoItemTypes = ['overdueSubmission', 'overdueReview', 'unpublishedReview', 'unassignedReview', 'notAssignedTeam']

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
    };
  }

  // progress-table.service
  getEnrolments() {
    return {
      total: 50,
      data: this._getStudents()
    };
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
    const data = [];
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
        members: this._getMembers()
      });
    });
    return {
      data: data,
      total: 10
    };
  }

  private _getMembers() {
    const members = [];
    const n = Math.floor(Math.random() * 5 + 5);
    Array(n).fill(1).forEach((x, i) => {
      members.push({
        name: this.students[i],
        image: './assets/demo/avatar.png'
      });
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
    };
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
    const date = new Date('2019-04-01');
    let value = 0;
    const data = [];
    let month;
    for (let i = 0; i < 8; i++) {
      month = date.getMonth() + 1;
      data.push({
        date: date.getFullYear() + '-' + month + '-' + date.getDate(),
        value: value
      });
      value += Math.floor(Math.random() * 15 + 5);
      date.setDate(date.getDate() + 7);
    }
    const today = new Date();
    month = today.getMonth() + 1;
    data.push({
      date: today.getFullYear() + '-' + month + '-' + today.getDate(),
      value: value
    });
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

  public getTodoItems() {
    const data = [];
    // generate 5 - 10 todo items
    Array(Math.floor(Math.random() * 5 + 5)).fill(1).forEach(i => {
      data.push(this._getRandomTodoItem());
    });
    return {
      data: data
    };
  }

  private _getRandomTodoItem() {
    const id = Math.floor(Math.random() * 10);
    let name, identifier = '';
    let meta = {};
    const count = Math.floor(Math.random() * 5 + 1);
    switch (this.todoItemTypes[Math.floor(Math.random() * this.todoItemTypes.length)]) {
      case 'overdueSubmission':
        name = 'Overdue Submission for Assessment ' + id;
        identifier = 'AssessmentSubmissionDue-' + id;
        meta = {
          count: count,
          action: 'message',
          action_title: 'remind students',
          users: Array(count).fill({}).map((x, i) => {
            return {
              user_id: i + 1,
              user_name: this.students[i],
              user_email: 'user' + i + '@practera.com',
              action_taken: false
            };
          }, this)
        };
        break;
      case 'overdueReview':
        name = 'Overdue Review for Assessment ' + id;
        identifier = 'AssessmentReviewRemind-' + id;
        meta = {
          count: count,
          action: 'message',
          action_title: 'remind reviewers',
          users: Array(count).fill({}).map((x, i) => {
            return {
              user_id: i + 1,
              user_name: this.students[i],
              user_email: 'user' + i + '@practera.com',
              action_taken: false
            };
          }, this)
        };
        break;
      case 'unpublishedReview':
        name = 'Unpublished Review for Assessment ' + id;
        identifier = 'AssessmentReviewPublish-' + id;
        meta = {
          count: count,
          action: 'go',
          action_title: 'publish reviews',
          action_target: '/admin/assess/assessment_reviews/index/' + id + '#ready-to-publish',
          users: Array(count).fill({}).map((x, i) => {
            return {
              user_id: i + 1,
            };
          }, this)
        };
        break;
      case 'unassignedReview':
        name = 'Unassigned Review for Assessment ' + id;
        identifier = 'AssessmentReviewAssign-' + id;
        meta = {
          count: count,
          action: 'go',
          action_title: 'assign reviews',
          action_target: '/admin/assess/assessment_reviews/index/' + id + '#unassigned',
          users: Array(count).fill({}).map((x, i) => {
            return {
              user_id: i + 1,
            };
          }, this)
        };
        break;
      case 'notAssignedTeam':
        name = 'Students not assigned to a team';
        identifier = 'CohortTeamStudent';
        meta = {
          count: count,
          action: 'go',
          action_title: 'manage teams',
          action_target: '/admin/teams/add',
          users: Array(count).fill({}).map((x, i) => {
            return {
              user_id: i + 1,
            };
          }, this)
        };
        break;
    }
    return {
      id: id,
      name: name,
      is_done: false,
      meta: meta
    }
  }

  public getTodoMessageTemplateNames(identifier) {
    if (identifier.includes('AssessmentSubmissionDue')) {
      return {
        data: ['default', 'student submission nudge']
      };
    }
    if (identifier.includes('AssessmentReviewRemind')) {
      return {
        data: ['default', 'review submission nudge']
      };
    }
  }

  public getTodoMessageTemplateContent(identifier, name) {
    if (name === 'student submission nudge') {
      return {
        data: {
          sms: 'Quick reminder to submit work for [project_name].',
          email: `Hi [first_name],
We noticed you have not yet submitted work for [project_name]. Please log in and complete the assignment as soon as you can.
Need help? Drop us a line [help_email]`
         }
      };
    }
    if (name === 'review submission nudge') {
      return {
        data: {
          sms: 'Quick reminder to submit review for [project_name].',
          email: `Hi [first_name],
We noticed you have not yet submitted your assigned reviews for [project_name]. Please log in and complete the review as soon as you can.
Need help? Drop us a line [help_email]`
         }
      };
    }
    return {
      data: {
        sms: `Your [project_name] could be going better. Here's how to improve right now:`,
        email: `Hi [first_name],
We've noticed a few things with your [project_name] that could be improved.`
       }
    };
  }
}
