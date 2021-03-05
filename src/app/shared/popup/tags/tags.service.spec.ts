import { TestBed } from '@angular/core/testing';
import { TagsService } from './tags.service';
import { of } from 'rxjs';
import { RequestService } from '@shared/request/request.service';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';
import { UtilsService } from '@services/utils.service';

describe('TagsService', () => {
  let service: TagsService;
  const demoSpy = jasmine.createSpyObj('DemoService', ['getTags', 'updateExperienceTags']);
  const requestSpy = jasmine.createSpyObj('RequestService', ['graphQLQuery', 'graphQLMutate']);
  const utilsSpy = jasmine.createSpyObj('UtilsService', ['broadcastEvent']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TagsService,
        {
          provide: RequestService,
          useValue: requestSpy
        },
        {
          provide: DemoService,
          useValue: demoSpy
        },

        {
          provide: UtilsService,
          useValue: utilsSpy
        },
      ]
    });
    service = TestBed.inject(TagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('for getTagsBy', () => {
    let expectResult;
    afterEach(() => {
      service.getTagsBy('ta').subscribe(res => expect(res).toEqual(expectResult));
    })
    it('demo resopnse', () => {
      environment.demo = true;
      expectResult = [];
      demoSpy.getTags = jasmine.createSpy().and.returnValue(of({}));
    });
    it('graphql resopnse', () => {
      environment.demo = false;
      requestSpy.graphQLQuery = jasmine.createSpy().and.returnValue(of({
        data: {
          tags: [
            { name: 'a' },
            { name: 'b' }
          ]
        }
      }));
      expectResult = ['a', 'b'];
    });
  });

  describe('for updateExperienceTags', () => {
    const exp = {
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
    let result;
    afterEach(() => {
      service.updateExperienceTags(exp, ['a', 'b']).subscribe(res => expect(res).toEqual(result));
      expect(utilsSpy.broadcastEvent).toHaveBeenCalled();
    })
    it('demo resopnse', () => {
      environment.demo = true;
      demoSpy.updateExperienceTags = jasmine.createSpy().and.returnValue(of({
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
      requestSpy.graphQLMutate = jasmine.createSpy().and.returnValue(of({
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
