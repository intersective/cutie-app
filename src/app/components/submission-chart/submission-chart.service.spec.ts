import { TestBed } from '@angular/core/testing';

import { SubmissionChartService } from './submission-chart.service';

describe('SubmissionChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmissionChartService = TestBed.get(SubmissionChartService);
    expect(service).toBeTruthy();
  });
});
