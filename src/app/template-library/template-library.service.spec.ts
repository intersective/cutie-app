import { TestBed } from '@angular/core/testing';

import { TemplateLibraryService } from './template-library.service';
import { RequestService } from '@shared/request/request.service';
import { DemoService } from '@services/demo.service';
import { environment } from '@environments/environment';
import {of} from 'rxjs';

describe('TemplateLibraryService', () => {
  let service: TemplateLibraryService;
  const demoService = jasmine.createSpyObj('DemoService', ['getTemplates', 'getTemplate', 'importExperience']);
  const requestService = jasmine.createSpyObj('RequestService', ['graphQLQuery', 'graphQLMutate']);

  const dummyTemplate = {
    name: 'exp',
    uuid: 'abc123'
  };

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

  describe('Standardised template category equality ignores special characters', () => {
    it('simple strings', () => {
      expect(TemplateLibraryService.isInCategory('internship', 'internship')).toBeTruthy();
    });
    it('capital letters', () => {
      expect(TemplateLibraryService.isInCategory('INTERNSHIP', 'interNshiP')).toBeTruthy();
    });
    it('white space', () => {
      expect(TemplateLibraryService.isInCategory('inte rns h ip', ' int ernsh ip   ')).toBeTruthy();
    });
    it('dashes', () => {
      expect(TemplateLibraryService.isInCategory('inter-n-ship', 'in-ternsh-ip')).toBeTruthy();
    });
    it('underscores', () => {
      expect(TemplateLibraryService.isInCategory('inter_n_ship', 'i_n_t_ernship____')).toBeTruthy();
    });
    it('periods', () => {
      expect(TemplateLibraryService.isInCategory('.internship.', 'inte.rnship')).toBeTruthy();
    });
    it('dollars', () => {
      expect(TemplateLibraryService.isInCategory('int$er$n$ship$$', '$$in$ternship')).toBeTruthy();
    });
    it('ampersands', () => {
      expect(TemplateLibraryService.isInCategory('i&&nt&er&nship', 'internship&&&&')).toBeTruthy();
    });
    it('asterisk', () => {
      expect(TemplateLibraryService.isInCategory('in**ternship***', '*i*n*t*e*r*n*s*h**i*p*')).toBeTruthy();
    });
    it('percentage', () => {
      expect(TemplateLibraryService.isInCategory('%in%%ternship%%', '%in%t%e%r%n%s%h%%i%p%')).toBeTruthy();
    });
    it('exclamation mark', () => {
      expect(TemplateLibraryService.isInCategory('in!ter!nship!', 'i!n!t!e!rnsh!!ip!!!')).toBeTruthy();
    });
    it('at symbol', () => {
      expect(TemplateLibraryService.isInCategory('@@internship@@', 'i@n@t@e@r@n@s@h@@@i@p')).toBeTruthy();
    });
    it('hash', () => {
      expect(TemplateLibraryService.isInCategory('in#ter###nship', '#i#n#ternsh###ip')).toBeTruthy();
    });
    it('carrot', () => {
      expect(TemplateLibraryService.isInCategory('in^ter^^^nship', '^i^ntern^sh^ip^^')).toBeTruthy();
    });
    it('all', () => {
      expect(TemplateLibraryService.isInCategory(' *^^@!#!% & %$ .iNte__ %%%rn!!#@^-shIp.', '-^@#!@#^- i n__T_e.r%%$n--s    h#!!%___  _i  $$&-$- *  - P_')).toBeTruthy();
    });
    it('Fails if the word is different', () => {
      expect(TemplateLibraryService.isInCategory('internship', 'different')).toBeFalsy();
    });
    it('Fails if word is a little different', () => {
      expect(TemplateLibraryService.isInCategory('internship', 'internshipp')).toBeFalsy();
    });
    it('Fails if word is a little different and has special characters', () => {
      expect(TemplateLibraryService.isInCategory('internship $', ' internshipp ')).toBeFalsy();
    });
    it('Fails if word has different numbers', () => {
      expect(TemplateLibraryService.isInCategory('1 internship', '2 internship')).toBeFalsy();
    });
  });

  describe('for getTemplates', () => {
    it('demo response', () => {
      environment.demo = true;
      demoService.getTemplates = jasmine.createSpy().and.returnValue(of({}));
      service.getTemplates().subscribe(res => expect(res).toEqual(null));
    });
    it('graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({
        data: {
          templates: [dummyTemplate]
        }
      }));
      service.getTemplates().subscribe(res => expect(res).toEqual([dummyTemplate]));
    });
    it('handles undefined graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of(undefined));
      service.getTemplates().subscribe(res => expect(res).toEqual(null));
    });
    it('handles undefined data from graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({data: undefined}));
      service.getTemplates().subscribe(res => expect(res).toEqual(null));
    });
  });

  describe('for getTemplatesByCategory', () => {
    it('demo response', () => {
      environment.demo = true;
      demoService.getTemplates = jasmine.createSpy().and.returnValue(of({}));
      service.getTemplatesByCategory('category').subscribe(res => expect(res).toEqual(null));
    });
    it('graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({
        data: {
          templates: [dummyTemplate]
        }
      }));
      service.getTemplatesByCategory('category').subscribe(res => expect(res).toEqual([dummyTemplate]));
    });
    it('handles undefined graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of(undefined));
      service.getTemplatesByCategory('category').subscribe(res => expect(res).toEqual(null));
    });
    it('handles undefined data from graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({data: undefined}));
      service.getTemplatesByCategory('category').subscribe(res => expect(res).toEqual(null));
    });
  });

  describe('for getTemplatesByFilter', () => {
    it('demo response', () => {
      environment.demo = true;
      demoService.getTemplates = jasmine.createSpy().and.returnValue(of({}));
      service.getTemplatesByFilter('filter').subscribe(res => expect(res).toEqual(null));
    });
    it('graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({
        data: {
          templates: [dummyTemplate]
        }
      }));
      service.getTemplatesByFilter('filter').subscribe(res => expect(res).toEqual([dummyTemplate]));
    });
    it('handles undefined graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of(undefined));
      service.getTemplatesByFilter('filter').subscribe(res => expect(res).toEqual(null));
    });
    it('handles undefined data from graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({data: undefined}));
      service.getTemplatesByFilter('filter').subscribe(res => expect(res).toEqual(null));
    });
  });

  describe('for getTemplate', () => {
    it('demo response', () => {
      environment.demo = true;
      demoService.getTemplate = jasmine.createSpy().and.returnValue(of({}));
      // @ts-ignore
      service.getTemplate('abc123').subscribe(res => expect(res).toEqual(null));
    });
    it('graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({
        data: {
          template: dummyTemplate
        }
      }));
      service.getTemplate('abc123').subscribe(res => expect(res).toEqual(dummyTemplate));
    });
    it('handles undefined graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of(undefined));
      // @ts-ignore
      service.getTemplate('abc123').subscribe(res => expect(res).toEqual(null));
    });
    it('handles undefined data from graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({data: undefined}));
      // @ts-ignore
      service.getTemplate('abc123').subscribe(res => expect(res).toEqual(null));
    });
  });

  describe('for importExperience', () => {
    it('demo response', () => {
      environment.demo = true;
      demoService.importExperienceResponse = jasmine.createSpy().and.returnValue(of({}));
      // @ts-ignore
      service.importExperience('abc123').subscribe(res => expect(res).toEqual(null));
    });
    it('graphql response', () => {
      environment.demo = false;
      requestService.graphQLMutate = jasmine.createSpy().and.returnValue(of({
        data: {
          experienceUuid: 'abc123'
        }
      }));
      service.importExperience('abc123').subscribe(res => expect(res).toEqual({experienceUuid: 'abc123'}));
    });
    it('handles undefined graphql response', () => {
      environment.demo = false;
      requestService.graphQLMutate = jasmine.createSpy().and.returnValue(of(undefined));
      // @ts-ignore
      service.importExperience('abc123').subscribe(res => expect(res).toEqual(null));
    });
    it('handles undefined data from graphql response', () => {
      environment.demo = false;
      requestService.graphQLMutate = jasmine.createSpy().and.returnValue(of({data: undefined}));
      // @ts-ignore
      service.importExperience('abc123').subscribe(res => expect(res).toEqual(null));
    });
  });

  describe('for getCategories', () => {
    it('gets the categories', () => {
      environment.demo = true;
      expect(service.getCategories()).toEqual([
        {
          'leadImage': '',
          'name': 'Team Projects',
          'color': 'rgba(0,64,229, 0.7)',
          'isLarge': true
        },
        {
          'leadImage': '',
          'name': 'Internships',
          'color': 'rgba(85, 2, 136, 0.7)',
          'isLarge': true
        },
        {
          'leadImage': '',
          'name': 'Simulations',
          'color': 'rgba(229, 69, 0, 0.7)',
          'isLarge': true
        },
        {
          'leadImage': '',
          'name': 'Mentoring',
          'color': 'rgba(221, 0, 59, 0.7)',
          'isLarge': false
        },
        {
          'leadImage': '',
          'name': 'Accelerators',
          'color': 'rgba(37, 105, 120, 0.7)',
          'isLarge': false
        },
        {
          'leadImage': '',
          'name': 'Skills Portfolios',
          'color': 'rgba(9, 129, 7, 0.7)',
          'isLarge': false
        },
        {
          'leadImage': '',
          'name': 'Others',
          'color': 'rgba(69, 40, 48, 0.7)',
          'isLarge': false
        }
      ]);
    });
  });
});
