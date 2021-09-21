import { Injectable } from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { StorageService } from '@services/storage.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { delay } from 'rxjs/internal/operators';
import { environment } from '@environments/environment';
import { urlFormatter } from 'helper';

const CHARACTERS = {
  avengers: {
    name: 'Avengers',
    avatar: 'https://c3.klipartz.com/pngpicture/208/878/sticker-png-avengers-endgame-2019-avengers-logo-avengers-logo-thumbnail.png'
  },
  shield: {
    name: 'S.H.I.E.L.D.',
    avatar: 'https://c0.klipartz.com/pngpicture/420/169/gratis-png-nick-fury-s-h-i-e-l-d-marvel-universo-cinematico-marvel-comics-decal-s-h-i-e-l-d-thumbnail.png'
  },
  steven: {
    name: 'Steven G. Rogers',
    avatar: 'https://c0.klipartz.com/pngpicture/716/616/gratis-png-capitan-america-escudo-de-superheroes-escudo-de-dibujos-animados-thumbnail.png',
    email: 'steven@practera.com'
  },
  tony: {
    name: 'Tony Stark',
    avatar: 'https://c0.klipartz.com/pngpicture/471/25/gratis-png-hombre-de-acero-thumbnail.png',
    email: 'tony@practera.com'
  },
  thanos: {
    name: 'Thanos',
    avatar: 'https://c3.klipartz.com/pngpicture/468/242/sticker-png-thanos-background-thumbnail.png',
    email: 'thanos@practera.com'
  }
};

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
  tags = ['apple', 'banana', 'watermelon', 'peach', 'pineapple', 'grape', 'orange', 'stonemelon', 'dragon fruit'];
  channelMembers = [
    {
      uuid: '1',
      name: CHARACTERS.steven.name,
      role: 'participant',
      avatar: CHARACTERS.steven.avatar
    },
    {
      uuid: '2',
      name: CHARACTERS.tony.name,
      role: 'participant',
      avatar: CHARACTERS.tony.avatar
    },
    {
      uuid: '3',
      name: CHARACTERS.thanos.name,
      role: 'mentor',
      avatar: CHARACTERS.thanos.avatar
    }
  ];
  chatChannels = [
    {
      uuid: '1',
      name: CHARACTERS.avengers.name,
      avatar: CHARACTERS.avengers.avatar,
      targetUser: null,
      pusherChannel: 'private-develop-team-1447-322-20',
      roles: ['participant', 'mentor'],
      isAnnouncement: false,
      isDirectMessage: false,
      readonly: false,
      unreadMessageCount: 1,
      lastMessageCreated: '2020-07-14 06:20:37',
      lastMessage: 'Thanos is coming',
      canEdit: false
    },
    {
      uuid: '2',
      name: CHARACTERS.shield.name,
      avatar: CHARACTERS.shield.avatar,
      targetUser: null,
      pusherChannel: 'private-develop-team-1447-322-20',
      roles: ['participant', 'mentor'],
      isAnnouncement: false,
      isDirectMessage: false,
      readonly: false,
      unreadMessageCount: 0,
      lastMessageCreated: null,
      lastMessage: null,
      canEdit: false
    },
    {
      uuid: '3',
      name: CHARACTERS.steven.name,
      avatar: CHARACTERS.steven.avatar,
      targetUser: {
        email: CHARACTERS.steven.email,
        role: 'participant',
        teamName: CHARACTERS.avengers.name
      },
      pusherChannel: 'private-develop-team-1447-322-20',
      roles: ['participant'],
      isAnnouncement: false,
      isDirectMessage: true,
      readonly: false,
      unreadMessageCount: 0,
      lastMessageCreated: '2020-07-14 06:20:37',
      lastMessage: 'Avengers assemble',
      canEdit: false
    },
    {
      uuid: '4',
      name: CHARACTERS.tony.name,
      avatar: CHARACTERS.tony.avatar,
      targetUser: {
        email: CHARACTERS.tony.email,
        role: 'participant',
        teamName: CHARACTERS.avengers.name
      },
      pusherChannel: 'private-develop-team-1447-322-20',
      roles: ['participant'],
      isAnnouncement: false,
      isDirectMessage: true,
      readonly: false,
      unreadMessageCount: 2,
      lastMessageCreated: '2020-07-15 06:20:37',
      lastMessage: `I'm Ironman`,
      canEdit: false
    },
    {
      uuid: '5',
      name: CHARACTERS.thanos.name,
      avatar: CHARACTERS.thanos.avatar,
      targetUser: {
        email: CHARACTERS.thanos.email,
        role: 'mentor',
        teamName: CHARACTERS.thanos.name
      },
      pusherChannel: 'private-develop-team-1447-322-20',
      roles: ['participant', 'mentor'],
      isAnnouncement: false,
      isDirectMessage: true,
      readonly: false,
      unreadMessageCount: 2,
      lastMessageCreated: '2020-07-15 06:20:37',
      lastMessage: `I'm inevitable`,
      canEdit: false
    },
    {
      uuid: '6',
      name: null,
      avatar: CHARACTERS.thanos.avatar,
      targetUser: {
        email: CHARACTERS.thanos.email,
        role: 'mentor',
        teamName: CHARACTERS.thanos.name
      },
      pusherChannel: 'private-develop-team-1447-322-20',
      roles: ['participant', 'mentor'],
      isAnnouncement: false,
      isDirectMessage: true,
      readonly: false,
      unreadMessageCount: 2,
      lastMessageCreated: '2020-07-15 06:20:37',
      lastMessage: `I'm inevitable`,
      canEdit: false
    }
  ];
  chatMessages = [
    {
      uuid: '11',
      message: `I'm Ironman`,
      file: null,
      created: '2019-11-28 02:21:21',
      isSender: false,
      sender: {
        uuid: '1',
        name: CHARACTERS.tony.name,
        role: 'participant',
        avatar: CHARACTERS.tony.avatar
      }
    },
    {
      uuid: '1',
      message: 'Thanos is coming',
      file: null,
      created: '2019-11-28 02:21:21',
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
      message: '',
      file: JSON.stringify({
        container: 'practera-aus',
        filename: 'Thanos_is_coming.pdf',
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
      created: '2019-11-27 02:25:21',
      isSender: false,
      sender: {
        uuid: '3',
        name: CHARACTERS.steven.name,
        role: 'participant',
        avatar: CHARACTERS.steven.avatar
      }
    },
    {
      uuid: '3',
      message: 'Hi guys, check this out!',
      file: null,
      created: '2019-11-27 02:21:21',
      isSender: false,
      sender: {
        uuid: '3',
        name: CHARACTERS.steven.name,
        role: 'participant',
        avatar: CHARACTERS.steven.avatar
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
  timelineUsers = [
    {
      uuid: '60712b63-95c8-bffe-ba86-784f1c0f6426',
      name: 'coordinator+02',
      email: 'coordinator+02@practera.com',
      role: 'coordinator',
      avatar: 'https://www.gravatar.com/avatar/aeded3a2d9242b1c8144ea079f1acc42?d=https://sandbox.practera.com/img/user-512.png&s=50',
      enrolmentUuid: '5f9f92b4-2fa0-468d-9000-185dac110002',
      team: null
    },
    {
      uuid: '73fbb872-9658-9543-bdb4-ac85a6a253ab',
      name: 'mentor+04',
      email: 'mentor+04@practera.com',
      role: 'mentor',
      avatar: 'https://www.gravatar.com/avatar/fc4b6bea10864603ffc693a27fca6d78?d=https://sandbox.practera.com/img/user-512.png&s=50',
      enrolmentUuid: '0c389a89-722b-99ff-8d25-3debb9e2f17e',
      team: {
        uuid: '5f9f938f-392c-4424-a1bd-15f1ac110002',
        name: 'Team 2'
      }
    },
    {
      uuid: '8bee29d0-bf45-af7d-0927-19a73a7e1840',
      name: 'student+02',
      email: 'student+02@practera.com',
      role: 'participant',
      avatar: 'https://www.gravatar.com/avatar/db30b12260b2c589b1394b26390eab50?d=https://sandbox.practera.com/img/user-512.png&s=50',
      enrolmentUuid: '436b9500-5fbf-7175-72c3-ee661b5c99b0',
      team: {
        uuid: '5f927d94-1718-44b7-9996-5cf8ac110002',
        name: 'Team 1'
      }
    },
    {
      uuid: '8d1f3cdf-d697-e957-7120-b5568159a978',
      name: 'student+01',
      email: 'student+01@practera.com',
      role: 'participant',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50',
      enrolmentUuid: 'e1a2aa12-bb1f-71c9-0ad5-fe5a56d635f9',
      team: {
        uuid: '5f927d94-1718-44b7-9996-5cf8ac110002',
        name: 'Team 1'
      }
    },
    {
      uuid: '158c470c-64df-c3b1-db5d-82b1db2f263d',
      name: 'coordinator+01',
      email: 'coordinator+01@practera.com',
      role: 'coordinator',
      avatar: 'https://www.gravatar.com/avatar/432005178fd530c00c9ac7ace134fe7d?d=https://sandbox.practera.com/img/user-512.png&s=50',
      enrolmentUuid: '52c0eee1-ca1e-f8e2-9693-95ffa14070d1',
      team: null
    },
    {
      uuid: '9b96af23-e7e0-5d19-2d71-e0064c895a8d',
      name: 'mentor+02',
      email: 'mentor+02@practera.com',
      role: 'mentor',
      avatar: 'https://www.gravatar.com/avatar/c9cdff7fef088b13e2b75a4ad7dddc95?d=https://sandbox.practera.com/img/user-512.png&s=50',
      enrolmentUuid: '3a2e3b7a-fcc1-e1e8-cf37-7989753dd438',
      team: {
        uuid: '5f9f938f-392c-4424-a1bd-15f1ac110002',
        name: 'Team 2'
      }
    }
  ];

  experiences = [
    {
      uuid: '8fad2d07-8b17-9c09-b744-414c73767c29',
      name: 'Tech PM',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      type: 'work simulation',
      status: 'draft',
      role: 'admin',
      setupStep: 'configuration',
      leadImage: '',
      todoItemCount: 0,
      color: '#ffc107',
      tags: [],
      statistics: {
        enrolledUserCount: {
          admin: 0,
          coordinator: 0,
          mentor: 0,
          participant: 0
        },
        registeredUserCount: {
          admin: 0,
          coordinator: 0,
          mentor: 0,
          participant: 0
        },
        activeUserCount: {
          admin: 0,
          coordinator: 0,
          mentor: 0,
          participant: 0
        },
        feedbackLoopStarted: 0,
        feedbackLoopCompleted: 0,
        reviewRatingAvg: 0,
        onTrackRatio: -1,
        lastUpdated: 1612493090291
      }
    },
    {
      uuid: '16c3d514-b459-b9d1-05c8-2bd1f582447c',
      name: 'XCELERY 2.0',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      type: 'internship',
      status: 'live',
      role: 'coordinator',
      setupStep: 'visuals',
      leadImage: '',
      color: '#28a745',
      todoItemCount: 1,
      tags: this.tags.map(t => ({ name: t })),
      statistics: {
        enrolledUserCount: {
          admin: 4,
          coordinator: 3,
          mentor: 3,
          participant: 15
        },
        registeredUserCount: {
          admin: 4,
          coordinator: 3,
          mentor: 3,
          participant: 11
        },
        activeUserCount: {
          admin: 1,
          coordinator: 1,
          mentor: 2,
          participant: 8
        },
        feedbackLoopStarted: 300,
        feedbackLoopCompleted: 129,
        reviewRatingAvg: 0.83,
        onTrackRatio: 0.75,
        lastUpdated: 1612774050261
      }
    },
    {
      uuid: '16c3d514-b459-b9d1-05c8-2bd1f582447d',
      name: 'Teamnovation',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      type: 'team project',
      status: 'live',
      role: 'admin',
      setupStep: 'visuals',
      leadImage: '',
      color: '',
      todoItemCount: 3,
      tags: [{
        name: 'apple'
      },
      {
        name: 'banana'
      },
      {
        name: 'watermelon'
      }],
      statistics: {
        enrolledUserCount: {
          admin: 4,
          coordinator: 3,
          mentor: 5,
          participant: 53
        },
        registeredUserCount: {
          admin: 4,
          coordinator: 3,
          mentor: 4,
          participant: 50
        },
        activeUserCount: {
          admin: 1,
          coordinator: 3,
          mentor: 2,
          participant: 23
        },
        feedbackLoopStarted: 50,
        feedbackLoopCompleted: 0,
        reviewRatingAvg: 0,
        onTrackRatio: -1,
        lastUpdated: 1612775394683
      }
    },
    {
      uuid: '84f14db9-491a-09f7-ae61-9926f3ad8c8d',
      name: 'GROW 2020',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      type: 'team project',
      status: 'completed',
      role: 'admin',
      setupStep: 'visuals',
      leadImage: '',
      color: '',
      todoItemCount: 0,
      tags: [{
        name: 'apple'
      },
      {
        name: 'watermelon'
      }],
      statistics: {
        enrolledUserCount: {
          admin: 0,
          coordinator: 0,
          mentor: 1,
          participant: 21
        },
        registeredUserCount: {
          admin: 0,
          coordinator: 0,
          mentor: 1,
          participant: 21
        },
        activeUserCount: {
          admin: 0,
          coordinator: 0,
          mentor: 0,
          participant: 0
        },
        feedbackLoopStarted: 120,
        feedbackLoopCompleted: 56,
        reviewRatingAvg: 0.76,
        onTrackRatio: -1,
        lastUpdated: 1612493090322
      }
    }
  ];

  templates = [
    {
      uuid: '000f562e-0ed0-4afe-af53-7a8d20558ce1',
      name: 'Consulting Project Experience',
      description: `<p>Practera is the leading platform to power high quality experiential learning programs.<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<\p><p>This is more content</p>`,
      leadImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2252&q=80',
      leadVideoUrl: 'https://www.filepicker.io/api/file/2i8R83noQbaJcbA9woIL',
      type: 'Work Simulation',
      attributes: ['teambased projects', '12-weeks', 'feedback loops'],
      designMapUrl: 'https://www.filepicker.io/api/file/NvgFmnp3RhmIypodBlVZ',
      operationsManualUrl: 'https://www.filepicker.io/api/file/vFYhEyoTRaCBXZrdtNge',
      isPublic: false
    },
    {
      uuid: '34c3d514-b459-b9d1-05c8-2bd1f582447c',
      name: 'XCELERY 2.0',
      description: `<p>This experience is perfect if you want to run 2-week virtual programs where teams of students can work collaboratively to solve a real industry challenge e.g. for a Startup, SME or Non-profit.<br></p><p>In the Deal Book Nano Project, student teams support Startups, SME’s and NGO’s to find funding sources. Each student is expected to input 25 hours of effort across the two weeks and will work in a remote, virtual fashion with their team. </p><p><span>The Practera app is used to support learners through their experiential learning; learners will submit deliverables (Draft &amp; Final Report) for Client review, iteratively reflect on their skill development and experience, and to access supportive learning content.</span><br></p><p><br></p>`,
      leadImageUrl: '',
      leadVideoUrl: '',
      type: 'Internship',
      isPublic: false
    },
    {
      uuid: '16c3d514-b459-b9d1-05c8-2bd1f582447d',
      name: 'Teamnovation',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80',
      leadVideoUrl: '',
      type: 'Team Project',
      isPublic: true
    },
    {
      uuid: '84f14db9-491a-09f7-ae61-9926f3ad8c8d',
      name: 'GROW 2020',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services<br/><br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
      leadVideoUrl: '',
      type: 'Mentoring',
      isPublic: true
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
    return of({
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
    }).pipe(delay(2000));
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

  getUsers(data) {
    return {
      data: {
        users: this.timelineUsers
      }
    };
  }

  getCurrentUser() {
    return {
      data: {
        user: {
          enrolmentUuid: '5f9f92b4-2fa0-468d-9000-185dac110002'
        }
      }
    };
  }

  getExperiences() {
    return of({
      data: {
        experiences: [...this.experiences, ...this.experiences, ...this.experiences, ...this.experiences, ...this.experiences]
      }
    }).pipe(delay(1000));
  }

  getTemplates() {
    return of({
      data: {
        templates: [...this.templates, ...this.templates, ...this.templates, ...this.templates, ...this.templates]
      }
    }).pipe(delay(1000));
  }


  getCustomTemplates() {
    return of({
      data: {
        templates: [...this.templates.filter(template => !template.isPublic), ...this.templates.filter(template => !template.isPublic), ...this.templates.filter(template => !template.isPublic)]
      }
    }).pipe(delay(1000));
  }

  getTemplate() {
    return of({
      data: {
        template: this.templates[0]
      }
    }).pipe(delay(1000));
  }

  importExperience() {
    return of({
      data: {
        importExperience: {
          experienceUuid: '000f562e-0ed0-4afe-af53-7a8d20558ce1'
        }
      }
    }).pipe(delay(1000));
  }

  importExperienceUrl(uuid: string) {
    const temUrl = `http://127.0.0.1:3000/template/${uuid}`;
    return of({
      data: {
        importExperienceUrl: urlFormatter(environment.Practera, `api/v2/plan/experience/importsse?template_url=${encodeURIComponent(temUrl)}`)
      }
    }).pipe(delay(1000));
  }

  duplicateExperienceUrl(uuid: string) {
    return of({
      data: {
        duplicateExperienceUrl: urlFormatter(environment.Practera, `api/v2/plan/experience/importsse?uuid=${uuid}&roles[]=admin`)
      }
    }).pipe(delay(1000));
  }

  getTags() {
    return of({
      data: {
        tags: this.tags.map(t => {
          return {
            name: t
          };
        })
      }
    }).pipe(delay(1000));
  }

  updateExperienceTags(experience, tags) {
    console.log('update experience tag:', experience, tags);
    return of({}).pipe(delay(1000));
  }

  duplicateExperience(uuid, roles) {
    console.log('duplicate experience uuid', uuid, roles);
    return of({}).pipe(delay(1000));
  }

  deleteExperience(experience) {
    console.log('delete experience:', experience.uuid);
    return of({}).pipe(delay(1000));
  }

  archiveExperience(experience) {
    console.log('archive experience:', experience.uuid);
    return of({}).pipe(delay(1000));
  }

  getExpsStatistics(uuids) {
    return of({
      data: {
        expsStatistics: uuids.map(u => ({
          uuid: u,
          statistics: {
            ...this.experiences[1].statistics,
            ...{
              lastUpdated: Date.now()
            }
          }
        }))
      }
    }).pipe(delay(1000));
  }

}
