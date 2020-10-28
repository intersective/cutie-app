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
  todoItemTypes = ['overdueSubmission', 'overdueReview', 'unpublishedReview', 'unassignedReview', 'notAssignedTeam'];
  todoItemTypeCounts = {
    notAssignedTeam: 0,
    unassignedReview: 0,
    unpublishedReview: 0
  };
  channelMembers = [
    {
      uuid: '1',
      name: 'student+01',
      role: 'participant',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
    },
    {
      uuid: '2',
      name: 'student1',
      role: 'participant',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
    },
    {
      uuid: '3',
      name: 'student2',
      role: 'participant',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
    },
    {
      uuid: '4',
      name: 'mentor1',
      role: 'mentor',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
    },
    {
      uuid: '5',
      name: 'student1',
      role: 'participant',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
    },
    {
      uuid: '6',
      name: 'student2',
      role: 'participant',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
    },
    {
      uuid: '7',
      name: 'mentor1',
      role: 'mentor',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
    },
    {
      uuid: '8',
      name: 'student1',
      role: 'participant',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
    }
  ];
  chatChannels = [
    {
      uuid: '1',
      name: 'Team 1',
      avatar: 'https://flaticons.net/icon.php?slug_category=people&slug_icon=user-group',
      pusherChannel: 'private-develop-team-1447-322-20',
      roles: ['participant', 'mentor'],
      isAnnouncement: false,
      isDirectMessage: false,
      readonly: false,
      unreadMessageCount: 1,
      lastMessageCreated: '2020-07-14 06:20:37',
      lastMessage: '123',
      canEdit: false
    },
    {
      uuid: '2',
      name: 'Timeline 01',
      avatar: 'https://flaticons.net/icon.php?slug_category=people&slug_icon=user-group',
      pusherChannel: 'private-develop-team-1447-322-20',
      roles: ['participant', 'mentor'],
      isAnnouncement: false,
      isDirectMessage: false,
      readonly: false,
      unreadMessageCount: 0,
      lastMessageCreated: null,
      lastMessage: null,
      canEdit: false
    }
  ];
  chatMessages = [
    {
      uuid: '1',
      message: 'test message 01',
      file: null,
      created: '2020-02-27 01:48:28',
      isSender: true,
      sender: {
        uuid: '1',
        name: 'student+01',
        role: 'participant',
        avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
      }
    },
    {
      uuid: '2',
      message: 'test admin message 01',
      file: JSON.stringify({
        container: 'practera-aus',
        filename: 'file-sample_150kB.pdf',
        handle: 'VcVHlY1SzSC8VKNuXFBt',
        key: 'appv2/stage/uploads/37ad733fdf20adf0de20effcbbf6f120/THPhHZoRCiUscy4hrXvQ_file-sample_150kB.pdf',
        mimetype: 'application/pdf',
        originalFile: {
          name: 'file-sample_150kB.pdf',
          size: 142786,
          type: 'application/pdf'
        },
        originalPath: 'file-sample_150kB.pdf',
        size: 142786,
        source: 'local_file_system',
        status: 'Stored',
        uploadId: '2ZaurtAztrY45d4S',
        url: 'https://cdn.filestackcontent.com/VcVHlY1SzSC8VKNuXFBt'
      }),
      created: '2020-01-30 06:18:45',
      isSender: false,
      sender: {
        uuid: '3',
        name: 'student2',
        role: 'participant',
        avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
      }
    },
    {
      uuid: '3',
      message: 'test message 02',
      file: null,
      created: '2019-11-27 02:21:21',
      isSender: false,
      sender: {
        uuid: '3',
        name: 'student2',
        role: 'participant',
        avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
      }
    }
  ];
  pusherChannels = [
    {
      pusherChannel: 'fgv34fg-34-8472354eb'
    },
    {
      pusherChannel: 'k76i865-jyj-5f44eb4f'
    }
  ];
  constructor(
    private utils: UtilsService,
    private storage: StorageService
  ) { }

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
            Program: { name: 'Program 1' },
            Project: {},
            Timeline: { id: 1 }
          },
          {
            Enrolment: {},
            Program: { name: 'Program 2' },
            Project: {},
            Timeline: { id: 2 }
          },
          {
            Enrolment: {},
            Program: { name: 'Program 3' },
            Project: {},
            Timeline: { id: 3 }
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
    const status = this.allStatus[Math.floor(Math.random() * this.allStatus.length)];
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

  private _numberFormatter(number: number) {
    return number < 10 ? '0' + number : number;
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
        date: date.getFullYear() + '-' + this._numberFormatter(month) + '-' + this._numberFormatter(date.getDate()),
        value: value
      });
      value += Math.floor(Math.random() * 15 + 5);
      date.setDate(date.getDate() + 7);
    }
    const today = new Date();
    month = today.getMonth() + 1;
    data.push({
      date: today.getFullYear() + '-' + this._numberFormatter(month) + '-' + this._numberFormatter(today.getDate()),
      value: value
    });
    return {
      data: {
        submissions: {
          data: data,
          max: 140
        }
      }
    };
  }

  // elsa-todo-list.service
  public getTodoItems() {
    const data = [];
    // generate 5 - 10 todo items
    Array(Math.floor(Math.random() * 10 + 5)).fill(1).forEach(i => {
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
    const isTeam = Math.random() > 0.7;
    switch (this._getRandomTodoItemType()) {
      case 'overdueSubmission':
        name = 'Overdue Submission for Assessment ' + id;
        identifier = 'AssessmentSubmissionDue-' + id;
        meta = {
          count: count,
          action: 'message',
          action_title: 'remind students',
          is_team: isTeam,
        };
        if (isTeam) {
          meta['teams'] = Array(count).fill({}).map((x, i) => {
            return {
              team_id: i + 1,
              team_name: 'Team ' + this.students[i],
              action_taken: false
            };
          }, this);
        } else {
          meta['users'] = Array(count).fill({}).map((x, i) => {
            return {
              user_id: i + 1,
              user_name: this.students[i],
              user_email: 'user' + i + '@practera.com',
              action_taken: false
            };
          }, this);
        }
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
      identifier: identifier,
      is_done: false,
      meta: meta
    };
  }

  private _getRandomTodoItemType() {
    const type = this.todoItemTypes[Math.floor(Math.random() * this.todoItemTypes.length)];
    // only return those type of todo item once
    if (this.utils.has(this.todoItemTypeCounts, type)) {
      if (this.todoItemTypeCounts[type]) {
        return this._getRandomTodoItemType();
      }
      this.todoItemTypeCounts[type] = 1;
    }
    return type;
  }

  // message.service
  public getMessageTemplates(identifier) {
    const data = [];
    let templates = [];
    if (identifier.includes('AssessmentSubmissionDue')) {
      templates = ['default', 'student submission nudge'];
    }
    if (identifier.includes('AssessmentReviewRemind')) {
      templates = ['default', 'review submission nudge'];
    }
    templates.forEach(template => {
      data.push(this._getMessageContent(template));
    });
    return {
      data: data
    };
  }

  private _getMessageContent(name) {
    switch (name) {
      case 'student submission nudge':
        return {
          name: name,
          sms: 'Quick reminder to submit work for [project_name].',
          email: `Hi [first_name],\nWe noticed you have not yet submitted work for [project_name].
           Please log in and complete the assignment as soon as you can.\nNeed help? Drop us a line [help_email]`
        };
      case 'review submission nudge':
        return {
          name: name,
          sms: 'Quick reminder to submit review for [project_name].',
          email: `Hi [first_name],\nWe noticed you have not yet submitted your assigned reviews for [project_name].
           Please log in and complete the review as soon as you can.\nNeed help? Drop us a line [help_email]`
        };
      default:
        return {
          name: name,
          sms: `Your [project_name] could be going better. Here's how to improve right now:`,
          email: `Hi [first_name],\nWe've noticed a few things with your [project_name] that could be improved.`
        };
    }

  }

  // chat.service
  getChats() {
    return {
      data: {
        channels: this.chatChannels
      }
    };
  }

  getMessages(data) {
    if (data.channelUuid === '2' || data.channelUuid === '1234') {
      return {
        data: {
          channel: {
            chatLogsConnection: {
              cursor: null,
              chatLogs: []
            }
          }
        }
      };
    }
    return {
      data: {
        channel: {
          chatLogsConnection: {
            cursor: '1234',
            chatLogs: this.chatMessages
          }
        }
      }
    };
  }

  getMembers(channelId) {
    return {
      data: {
        channel: {
          members: this.channelMembers
        }
      }
    };
  }

  getPusherChannels() {
    return {
      data: {
        channels: this.pusherChannels
      }
    };
  }

  getNewChannel() {
    return {
      data: {
        createChannel: {
          uuid: '1234',
          name: 'cohort channel name',
          avatar: 'https://flaticons.net/icon.php?slug_category=people&slug_icon=user-group',
          pusherChannel: 'private-develop-team-1447-322-20',
          isAnnouncement: false,
          isDirectMessage: false,
          readonly: false,
          roles: ['participant', 'mentor'],
          canEdit: true
        }
      }
    };
  }

  getEditedChannel(data) {
    return {
      data: {
        editChannel: {
          uuid: data.uuid,
          name: data.name,
          avatar: 'https://flaticons.net/icon.php?slug_category=people&slug_icon=user-group',
          pusherChannel: 'private-develop-team-1447-322-20',
          isAnnouncement: false,
          isDirectMessage: false,
          readonly: false,
          roles: ['participant', 'mentor'],
          unreadMessageCount: 0,
          lastMessage: '1234',
          lastMessageCreated: '2020-01-30 06:18:45',
          canEdit: true
        }
      }
    };
  }

  getNewMessage(data) {
    return {
      data: {
        createChatLog: {
          uuid: data.channelUuid,
          isSender: false,
          message: data.message,
          file: data.file,
          created: '2020-08-13 08:10:10',
          sender: {
            uuid: '1',
            name: 'student+01',
            role: 'participant',
            avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
          }
        }
      }
    };
  }

}
