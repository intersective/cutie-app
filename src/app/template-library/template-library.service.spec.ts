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
      demoService.importExperience = jasmine.createSpy().and.returnValue(of({}));
      // @ts-ignore
      service.importExperience('abc123').subscribe(res => expect(res).toEqual(null));
    });
    it('graphql response', () => {
      environment.demo = false;
      requestService.graphQLMutate = jasmine.createSpy().and.returnValue(of({
        data: {
          importExperience: {
            experienceUuid: 'abc123'
          }
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

  describe('for importExperienceUrl', () => {
    it('demo response', () => {
      environment.demo = true;
      demoService.importExperienceUrl = jasmine.createSpy().and.returnValue(of({
        data: { importExperienceUrl: 'test-url' }
      }));
      // @ts-ignore
      service.importExperienceUrl('abc123').subscribe(res => expect(res).toEqual('test-url'));
    });
    it('graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({
        data: {
          importExperienceUrl: 'test-url'
        }
      }));
      service.importExperienceUrl('abc123').subscribe(res => expect(res).toEqual('test-url'));
    });
    it('handles undefined graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of(undefined));
      // @ts-ignore
      service.importExperienceUrl('abc123').subscribe(res => expect(res).toEqual(null));
    });
    it('handles undefined data from graphql response', () => {
      environment.demo = false;
      requestService.graphQLQuery = jasmine.createSpy().and.returnValue(of({data: undefined}));
      // @ts-ignore
      service.importExperienceUrl('abc123').subscribe(res => expect(res).toEqual(null));
    });
  });

  describe('for getCategories', () => {
    it('gets the categories', () => {
      environment.demo = true;
      expect(service.getCategories()).toEqual([
        {
          'leadImage': '/assets/template-library/teamProjects.png',
          'name': 'Team Projects',
          'id': 'Team Project',
          'description': 'Create teams of learners who complete a project with multiple feedback loops from industry experts\n' +
            'Use and edit our pre-loaded content with step by step instructions used by more than 10,000 students. Team-based project require a client brief and someone to provide feedback for each learner team (If you don’t have projects for your learners, send us a note!)',
          'color': 'rgba(0,64,229, 0.7)',
          'isLarge': true
        },
        {
          'leadImage': '/assets/template-library/internship.png',
          'name': 'Internships',
          'id': 'Internship',
          'description': 'Monitor and quality assure your (virtual) internship program at scale with our fully editable content with step by step instructions used by more than 10,000 students. Use our step by step instructions for both intern and supervisor to engage in regular feedback, reflection and planning loops. Internships require a placement and supervisor to provide feedback for each learner.',
          'color': 'rgba(85, 2, 136, 0.7)',
          'isLarge': true
        },
        {
          'leadImage': '/assets/template-library/simulation.png',
          'name': 'Work Simulations',
          'id': 'Work Simulation',
          'description': 'Scaling authentic work-integrated learning experiences is hard - but did you know that you can simulate real world tasks in an authentic way that gives students an insight into their potential future job? We have created a range of realistic and authentic work simulation experiences that students love!',
          'color': 'rgba(229, 69, 0, 0.7)',
          'isLarge': true
        },
        {
          'leadImage': '/assets/template-library/mentoring.png',
          'name': 'Mentoring',
          'id': 'Mentoring',
          'description': 'Support mentees and mentors engage in a structured mentoring relationship. Our fully editable pre-loaded content comes with step by step instructions for both mentor and mentee to engage in regular feedback, reflection and planning loops. Mentoring experiences require pairs or groups of mentors and mentees.',
          'color': 'rgba(221, 0, 59, 0.7)',
          'isLarge': false
        },
        {
          'leadImage': '/assets/template-library/accelerators.png',
          'name': 'Accelerators',
          'id': 'Accelerator',
          'description': 'Run your accelerator program effectively and efficiently with our editable pre-loaded content with step by step instructions. Support teams of learners go through an innovation process with multiple feedback loops and manage quality assurance for your cohort to guarantee success.',
          'color': 'rgba(37, 105, 120, 0.7)',
          'isLarge': false
        },
        {
          'leadImage': '/assets/template-library/skillsPortfolio.png',
          'name': 'Skills Portfolios',
          'id': 'Skills Portfolio',
          'description': 'With our Skills Portfolio experiences, you can support learners to build portfolios of their real world learning experiences and achievements against competency frameworks. You can use any competency framework and drive skill development tracking with reflective learning and feedback loops.',
          'color': 'rgba(9, 129, 7, 0.7)',
          'isLarge': false
        },
        {
          'leadImage': '/assets/template-library/other.jpg',
          'name': 'Others',
          'id': 'Other',
          'description': 'Practera supports any type of experiential learning. Below are some examples of other experiences our customers have used in the past.',
          'color': 'rgba(69, 40, 48, 0.7)',
          'isLarge': false
        }
      ]);
    });
  });
});
