import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RequestService } from '@shared/request/request.service';

import { ProgressTableService } from './progress-table.service';
describe('ProgressTableService', () => {
  let service: ProgressTableService;
  let requestServiceSpy: jasmine.SpyObj<RequestService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProgressTableService,
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['get'])
        }
      ]
    });
    service = TestBed.get(ProgressTableService);
    requestServiceSpy = TestBed.get(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected enrolments', async() => {
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
    requestServiceSpy.get.and.returnValue(of(enrolmentsResponse));

    service.getEnrolments().subscribe(
      enrolments => expect(enrolments).toEqual(expectedReturn, 'expected enrolments'),
      fail
    );
    expect(requestServiceSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected teams', () => {
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
    requestServiceSpy.get.and.returnValue(of(teamsResponse));

    service.getTeams().subscribe(
      teams => expect(teams).toEqual(teamsResponse, 'expected teams'),
      fail
    );
    expect(requestServiceSpy.get.calls.count()).toBe(1, 'one call');
  });

});
