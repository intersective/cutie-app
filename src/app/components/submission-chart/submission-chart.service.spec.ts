import { TestBed } from '@angular/core/testing';

import { SubmissionChartService } from './submission-chart.service';
import { RequestService } from '@shared/request/request.service';
import { DemoService } from '@services/demo.service';

describe('SubmissionChartService', () => {
  let service: SubmissionChartService;
  let requestServiceSpy: jasmine.SpyObj<RequestService>;
  let demoServiceSpy: jasmine.SpyObj<DemoService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubmissionChartService,
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['get'])
        },
        {
          provide: DemoService,
          useValue: jasmine.createSpyObj('DemoService', ['getSubmissions'])
        }
      ]
    });
    service = TestBed.inject(SubmissionChartService);
    requestServiceSpy = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
    demoServiceSpy = TestBed.inject(DemoService) as jasmine.SpyObj<DemoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
