import { TestBed } from '@angular/core/testing';

import { TemplateLibraryService } from './template-library.service';
import { RequestService } from '@shared/request/request.service';
import { DemoService } from '@services/demo.service';

describe('TemplateLibraryService', () => {
  let service: TemplateLibraryService;
  const demoService = jasmine.createSpyObj('DemoService', ['getExperiences', 'getExpStatistics', 'deleteExperience', 'archiveExperience']);
  const requestService = jasmine.createSpyObj('RequestService', ['graphQLQuery', 'graphQLMutate', 'post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TemplateLibraryService,
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
    service = TestBed.inject(TemplateLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
