import { TestBed } from '@angular/core/testing';

import { MetricGridService } from './metric-grid.service';

describe('MetricGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetricGridService = TestBed.get(MetricGridService);
    expect(service).toBeTruthy();
  });
});
