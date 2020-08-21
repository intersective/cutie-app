import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { RequestService } from '@shared/request/request.service';
import { DemoService } from '@services/demo.service';
import { environment } from '@environments/environment';

import { ProgressTableService } from './progress-table.service';
describe('ProgressTableService', () => {
  let service: ProgressTableService;
  let requestServiceSpy: jasmine.SpyObj<RequestService>;
  let demoServiceSpy: jasmine.SpyObj<DemoService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProgressTableService,
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['get'])
        },
        {
          provide: DemoService,
          useValue: jasmine.createSpyObj('DemoService', ['getEnrolments', 'getTeams'])
        }
      ]
    });
    service = TestBed.get(ProgressTableService);
    requestServiceSpy = TestBed.get(RequestService);
    demoServiceSpy = TestBed.inject(DemoService) as jasmine.SpyObj<DemoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // can't identify why this falling
  it('should return expected enrolments', fakeAsync(() => {
    const enrolmentsResponse = {
      data: [
        {
          name: 'student1',
          participant_email: 'student1@practera.com',
          user_uid: 'userid1',
          team_name: 'team1',
          image: 'image.com',
          progress: [{
            name: 'assessment name',
            due_date: '08 Sept 2019 07:00:00',
            submitted: '',
            status: 'not started',
            overdue: false
          }]
        }
      ],
      total: 10
    };
    const expectedReturn = {
      data: [
        {
          name: enrolmentsResponse.data[0].name,
          email: enrolmentsResponse.data[0].participant_email,
          teamName: enrolmentsResponse.data[0].team_name,
          userUid: enrolmentsResponse.data[0].user_uid,
          image: enrolmentsResponse.data[0].image,
          progress: enrolmentsResponse.data[0].progress
        }
      ],
      total: enrolmentsResponse.total
    };
    if (environment.demo) {
      let enrolmentsRes;
      demoServiceSpy.getEnrolments.and.returnValue(enrolmentsResponse);
      service.getEnrolments().subscribe((enrolments) => {
        enrolmentsRes = enrolments;
      });
      tick(1000);
      expect(enrolmentsRes).toEqual(expectedReturn, 'expected todoItems');
      expect(demoServiceSpy.getEnrolments.calls.count()).toBe(1, 'one call');
    } else {
      let enrolmentsRes;
      requestServiceSpy.get.and.returnValue(of(enrolmentsResponse));
      service.getEnrolments().subscribe((enrolments) => {
        enrolmentsRes = enrolments;
      });
      tick(1000);
      expect(enrolmentsRes).toEqual(expectedReturn, 'expected todoItems');
      expect(requestServiceSpy.get.calls.count()).toBe(1, 'one call');
    }
  }));

  it('should return expected teams', fakeAsync(() => {
    const teamsResponse = {
      data: [
        {
          name: 'team',
          uid: 'teamuid',
          progress: [{
            name: 'assessment name',
            due_date: '08 Sept 2019 07:00:00',
            submitted: '',
            status: 'not started',
            overdue: false
          }],
          members: [
            {
              name: 'student1',
              image: 'student1.image.com'
            },
            {
              name: 'student2',
              image: 'student2.image.com'
            }
          ]
        }
      ],
      total: 10
    };
    if (environment.demo) {
      let teamsRes;
      demoServiceSpy.getTeams.and.returnValue(teamsResponse);
      service.getTeams().subscribe((teams) => {
        teamsRes = teams;
      });
      tick(1000);
      expect(teamsRes).toEqual(teamsResponse, 'expected teams');
      expect(demoServiceSpy.getTeams.calls.count()).toBe(1, 'one call');
    } else {
      let teamsRes;
      requestServiceSpy.get.and.returnValue(of(teamsResponse));
      service.getTeams().subscribe((teams) => {
        teamsRes = teams;
      });
      tick(1000);
      expect(teamsRes).toEqual(teamsResponse, 'expected teams');
      expect(requestServiceSpy.get.calls.count()).toBe(1, 'one call');
    }
  }));

});
