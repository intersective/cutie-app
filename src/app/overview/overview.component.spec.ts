import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { SharedModule } from '@shared/shared.module';
import { OverviewComponent } from './overview.component';
import { OverviewService } from './overview.service';
import { UtilsService } from '@services/utils.service';
import { PopupService } from '@shared/popup/popup.service';
import * as XLSX from 'xlsx';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  const overviewSpy = jasmine.createSpyObj('OverviewService', ['getExperiences']);
  const utilsSpy = jasmine.createSpyObj('UtilsService', ['getEvent', 'has']);
  const popupSpy = jasmine.createSpyObj('PopupService', ['showCreateExp']);

  const exps = [
    {
      uuid: '16c3d514-b459-b9d1-05c8-2bd1f582447c',
      name: 'XCELERY 2.0',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      type: 'internship',
      status: 'live',
      setupStep: 'visuals',
      leadImage: '',
      todoItemCount: 1,
      tags: ['tag1', 'tag2', 'apple'],
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
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      type: 'team project',
      status: 'completed',
      setupStep: 'visuals',
      leadImage: '',
      todoItemCount: 3,
      tags: ['apple', 'banana', 'watermelon'],
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
          mentor: 3,
          participant: 23
        },
        feedbackLoopStarted: 50,
        feedbackLoopCompleted: 3,
        reviewRatingAvg: 0.7,
        onTrackRatio: -1,
        lastUpdated: 1612775394683
      }
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ OverviewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: OverviewService,
          useValue: overviewSpy
        },
        {
          provide: UtilsService,
          useValue: utilsSpy
        },
        {
          provide: PopupService,
          useValue: popupSpy
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    overviewSpy.getExperiences = jasmine.createSpy().and.returnValue(of(exps));
    utilsSpy.getEvent = jasmine.createSpy().and.returnValue(of({}));
    utilsSpy.has = jasmine.createSpy().and.callFake((obj, key) => obj.hasOwnProperty(key));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('skeleton only', () => {
    component.skeletonOnly = true;
    fixture.detectChanges();
    expect(component.experiences).toEqual([]);
    expect(component.loadingExps).toEqual(true);
  });

  it('should get experiences data', () => {
    fixture.detectChanges();
    expect(component.experiencesRaw).toEqual(exps);
    expect(component.experiences).toEqual(exps);
    expect(component.types).toEqual(['all', exps[0].type, exps[1].type]);
    expect(component.tags).toEqual([
      { name: 'tag1', count: 1, active: false },
      { name: 'tag2', count: 1, active: false },
      { name: 'apple', count: 2, active: false },
      { name: 'banana', count: 1, active: false },
      { name: 'watermelon', count: 1, active: false },
    ]);
    expect(component.loadingExps).toEqual(false);
  });

  it('should get experiences data filtered by tag', () => {
    component.experiencesRaw = exps;
    component.tags = [
      { name: 'tag1', count: 1, active: true },
      { name: 'tag2', count: 1, active: false },
      { name: 'apple', count: 2, active: false },
      { name: 'banana', count: 1, active: false },
      { name: 'watermelon', count: 1, active: false },
    ];
    component.filterAndOrder();
    expect(component.experiencesRaw).toEqual(exps);
    expect(component.experiences).toEqual([exps[0]]);
  });

  it('should get experiences data filtered by status', () => {
    component.experiencesRaw = exps;
    component.status = exps[0].status;
    component.filterAndOrder();
    expect(component.experiencesRaw).toEqual(exps);
    expect(component.experiences).toEqual([exps[0]]);
  });

  it('should get experiences data filtered by type', () => {
    component.experiencesRaw = exps;
    component.type = exps[0].type;
    component.filterAndOrder();
    expect(component.experiencesRaw).toEqual(exps);
    expect(component.experiences).toEqual([exps[0]]);
  });

  describe('should get experiences data sorted', () => {
    let expsResult;
    afterEach(() => {
      component.experiencesRaw = exps;
      component.filterAndOrder();
      expect(component.experiencesRaw).toEqual(exps);
      expect(component.experiences).toEqual(expsResult);
    });
    it('by created time asc', () => {
      component.sortBy = component.sortList[0];
      component.sortDesc = false;
      expsResult = [exps[1], exps[0]];
    });
    it('by participant count desc', () => {
      component.sortBy = component.sortList[1];
      component.sortDesc = true;
      expsResult = [exps[1], exps[0]];
    });
    it('by participant count asc', () => {
      component.sortBy = component.sortList[1];
      component.sortDesc = false;
      expsResult = [exps[0], exps[1]];
    });
    it('by mentor count desc', () => {
      component.sortBy = component.sortList[2];
      component.sortDesc = true;
      expsResult = [exps[1], exps[0]];
    });
    it('by mentor count asc', () => {
      component.sortBy = component.sortList[2];
      component.sortDesc = false;
      expsResult = [exps[0], exps[1]];
    });
    it('by recent active participants desc', () => {
      component.sortBy = component.sortList[3];
      component.sortDesc = true;
      expsResult = [exps[1], exps[0]];
    });
    it('by recent active participants asc', () => {
      component.sortBy = component.sortList[3];
      component.sortDesc = false;
      expsResult = [exps[0], exps[1]];
    });
    it('by recent active mentors desc', () => {
      component.sortBy = component.sortList[4];
      component.sortDesc = true;
      expsResult = [exps[1], exps[0]];
    });
    it('by recent active mentors asc', () => {
      component.sortBy = component.sortList[4];
      component.sortDesc = false;
      expsResult = [exps[0], exps[1]];
    });
    it('by feedback loops completed desc', () => {
      component.sortBy = component.sortList[5];
      component.sortDesc = true;
      expsResult = [exps[0], exps[1]];
    });
    it('by feedback loops completed asc', () => {
      component.sortBy = component.sortList[5];
      component.sortDesc = false;
      expsResult = [exps[1], exps[0]];
    });
    it('by on-track/off-track desc', () => {
      component.sortBy = component.sortList[6];
      component.sortDesc = true;
      expsResult = [exps[0], exps[1]];
    });
    it('by on-track/off-track asc', () => {
      component.sortBy = component.sortList[6];
      component.sortDesc = false;
      expsResult = [exps[1], exps[0]];
    });
    it('by feedback quality score desc', () => {
      component.sortBy = component.sortList[7];
      component.sortDesc = true;
      expsResult = [exps[0], exps[1]];
    });
    it('by feedback quality score asc', () => {
      component.sortBy = component.sortList[7];
      component.sortDesc = false;
      expsResult = [exps[1], exps[0]];
    });
  });

  it('handle events', () => {
    utilsSpy.getEvent = jasmine.createSpy().and.callFake(eventKey => {
      let eventData = {};
      switch (eventKey) {
        case 'exp-tags-updated':
          eventData = {
            experience: {
              uuid: exps[0].uuid
            },
            tags: ['tag1', 'tag3']
          };
          break;
        case 'exp-statistics-updated':
          eventData = {
            experience: {
              uuid: exps[0].uuid
            },
            statistics: exps[1].statistics
          };
          break;
      }
      return of(eventData);
    });
    fixture.detectChanges();
  });

  it('init with more than 7 exps', () => {
    overviewSpy.getExperiences = jasmine.createSpy().and.returnValue(of([...exps, ...exps, ...exps, ...exps]));
    fixture.detectChanges();
    expect(component.experiences.length).toEqual(7);
    expect(component.remainingExperiences.length).toEqual(1);
  });

  describe('load more', () => {
    it('remaining more than 7 exps', fakeAsync(() => {
      component.experiences = exps;
      component.remainingExperiences = [...exps, ...exps, ...exps, ...exps];
      component.loadMore({ target: { complete: () => {} }});
      tick(600);
      expect(component.experiences.length).toEqual(9);
      expect(component.remainingExperiences.length).toEqual(1);
    }));
    it('remaining less than 7 exps', fakeAsync(() => {
      component.experiences = exps;
      component.remainingExperiences = exps;
      component.loadMore({ target: { complete: () => {} }});
      tick(600);
      expect(component.experiences.length).toEqual(4);
      expect(component.remainingExperiences.length).toEqual(0);
    }));
  });

  it('add popup', () => {
    component.add();
    expect(popupSpy.showCreateExp).toHaveBeenCalled();
  });

  it('create report', () => {
    component.tags = [
      { name: 'tag1', count: 1, active: false },
      { name: 'tag2', count: 1, active: false },
      { name: 'apple', count: 2, active: true },
      { name: 'banana', count: 1, active: false },
      { name: 'watermelon', count: 1, active: false },
    ];
    component.experiences = exps;
    const writeFile = spyOn(XLSX, 'writeFile');
    component.createReport();
    expect(writeFile).toHaveBeenCalled();
  });

});
