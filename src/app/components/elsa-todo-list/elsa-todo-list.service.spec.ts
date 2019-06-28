import { TestBed } from '@angular/core/testing';

import { ElsaTodoListService } from './elsa-todo-list.service';

describe('ElsaTodoListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElsaTodoListService = TestBed.get(ElsaTodoListService);
    expect(service).toBeTruthy();
  });
});
