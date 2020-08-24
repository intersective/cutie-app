import { TestBed } from '@angular/core/testing';

import { MetricGridService } from './metric-grid.service';
import { RequestService } from '@shared/request/request.service';
import { DemoService } from '@services/demo.service';

describe('MetricGridService', () => {
  let service: MetricGridService;
  let requestSpy;
  let demoSpy;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MetricGridService,
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['get', 'post', 'graphQLQuery', 'graphQLMutate', 'apiResponseFormatError'])
        },
        {
          provide: DemoService,
          useValue: jasmine.createSpyObj('DemoService', ['getStatistics'])
        }
      ]
    });
    service = TestBed.inject(MetricGridService);
    requestSpy = TestBed.inject(RequestService);
    demoSpy = TestBed.inject(DemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
