import { TestBed } from '@angular/core/testing';

import { ProgressTableService } from './progress-table.service';

describe('ProgressTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressTableService = TestBed.get(ProgressTableService);
    expect(service).toBeTruthy();
  });
});
