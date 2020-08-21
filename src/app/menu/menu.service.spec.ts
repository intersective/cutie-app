import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { RequestService } from '@shared/request/request.service';
import { DemoService } from '@services/demo.service';

describe('MenuService', () => {
  let service: MenuService;
  let requestServiceSpy: jasmine.SpyObj<RequestService>;
  let demoServiceSpy: jasmine.SpyObj<DemoService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MenuService,
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
    service = TestBed.get(MenuService);
    requestServiceSpy = TestBed.get(RequestService);
    demoServiceSpy = TestBed.inject(DemoService) as jasmine.SpyObj<DemoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
