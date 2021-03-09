import { TestBed } from '@angular/core/testing';
import { OverviewService, Experience } from './overview.service';
import { of } from 'rxjs';
import { RequestService } from '@shared/request/request.service';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';

describe('OverviewService', () => {
  let service: OverviewService;
  const demoService = jasmine.createSpyObj('DemoService', ['getExperiences', 'getExpStatistics', 'deleteExperience', 'archiveExperience']);
  const requestService = jasmine.createSpyObj('RequestService', ['graphQLQuery', 'graphQLMutate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OverviewService,
        {
          provide: RequestService,
          useValue: requestService
        },
        {
          provide: DemoService,
          useValue: demoService
        },
      ]
    });
    service = TestBed.inject(OverviewService);
  });

  const exp: Experience = {
    uuid: 'exp-1',
    name: 'exp',
    description: '',
    type: 'mentoring',
    status: 'live',
    leadImage: '',
    setupStep: '',
    tags: [],
    todoItemCount: 2,
    statistics: null
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('for getExperiences', () => {
    it('demo resopnse', () => {
      environment.demo = true;
      demoService.getExperiences = jasmine.createSpy().and.returnValue(of({}));
      service.getExperiences().subscribe(res => expect(res).toEqual([]));
    });
    it('graphql resopnse', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({
        data: {
          experiences: [
            {
              name: 'exp',
              tags: [{ name: 'tag1' }, { name: 'tag2' }]
            }
          ]
        }
      }));
      service.getExperiences().subscribe(res => expect(res).toEqual([
        {
          name: 'exp',
          tags: ['tag1', 'tag2']
        }
      ]));
    });
  });

  describe('for getExpStatistics', () => {
    let result;
    afterEach(() => {
      service.getExpStatistics(exp).subscribe(res => expect(res).toEqual(result));
    });
    it('demo resopnse', () => {
      environment.demo = true;
      demoService.getExpStatistics = jasmine.createSpy().and.returnValue(of({}));
      result = null;
    });
    it('graphql resopnse', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({
        data: {
          expStatistics: 'stats-data'
        }
      }));
      result = 'stats-data';
    });
  });

  describe('for deleteExperience', () => {
    let result;
    afterEach(() => {
      service.deleteExperience(exp).subscribe(res => expect(res).toEqual(result));
    });
    it('demo resopnse', () => {
      environment.demo = true;
      demoService.deleteExperience = jasmine.createSpy().and.returnValue(of({
        data: {
          success: false
        }
      }));
      result = {
        data: {
          success: false
        }
      };
    });
    it('graphql resopnse', () => {
      environment.demo = false;
      requestService.graphQLMutate = jasmine.createSpy().and.returnValue(of({
        data: {
          success: true
        }
      }));
      result = {
        data: {
          success: true
        }
      };
    });
  });

  describe('for archiveExperience', () => {
    let result;
    afterEach(() => {
      service.archiveExperience(exp).subscribe(res => expect(res).toEqual(result));
    });
    it('demo resopnse', () => {
      environment.demo = true;
      demoService.archiveExperience = jasmine.createSpy().and.returnValue(of({
        data: {
          success: false
        }
      }));
      result = {
        data: {
          success: false
        }
      };
    });
    it('graphql resopnse', () => {
      environment.demo = false;
      requestService.graphQLMutate = jasmine.createSpy().and.returnValue(of({
        data: {
          success: true
        }
      }));
      result = {
        data: {
          success: true
        }
      };
    });
  });

});
