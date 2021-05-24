import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TemplateLibraryHomeComponent} from './template-library-home.component';
import {TemplateLibraryService} from '../template-library.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';

describe('TemplateLibraryHomeComponent', () => {
  let component: TemplateLibraryHomeComponent;
  let fixture: ComponentFixture<TemplateLibraryHomeComponent>;
  const templateLibraryServiceSpy = jasmine.createSpyObj('TemplateLibraryService', ['getTemplates', 'getCategories']);
  const routerSpy = { navigate: jasmine.createSpy('navigate') };

  const templates = [
    {
      uuid: '000f562e-0ed0-4afe-af53-7a8d20558ce1',
      name: 'Consulting Project Experience',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2252&q=80',
      leadVideoUrl: 'https://cdn.videvo.net/videvo_files/video/free/2013-08/small_watermarked/hd0992_preview.webm',
      type: 'Simulations',
    },
    {
      uuid: '34c3d514-b459-b9d1-05c8-2bd1f582447c',
      name: 'XCELERY 2.0',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: '',
      leadVideoUrl: '',
      type: 'Internships',
    },
    {
      uuid: '16c3d514-b459-b9d1-05c8-2bd1f582447d',
      name: 'Teamnovation',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80',
      leadVideoUrl: '',
      type: 'Team Projects'
    },
    {
      uuid: '84f14db9-491a-09f7-ae61-9926f3ad8c8d',
      name: 'GROW 2020',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
      leadVideoUrl: '',
      type: 'Mentoring'
    }
  ];

  const categories = [
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
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateLibraryHomeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: TemplateLibraryService,
          useValue: templateLibraryServiceSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateLibraryHomeComponent);
    component = fixture.componentInstance;
    templateLibraryServiceSpy.getTemplates = jasmine.createSpy().and.returnValue(of(templates));
    templateLibraryServiceSpy.getCategories = jasmine.createSpy().and.returnValue(categories);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show skeletons when loading', () => {
    component.loadingTemplates = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('ion-skeleton-text'))).toBeTruthy();
  });

  it('should not show skeletons when not loading', () => {
    component.loadingTemplates = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('ion-skeleton-text'))).toBeNull();
  });

  it('should categorise templates correctly', () => {
    const categorisedTemplates = [
      {
        category: categories[0],
        templates: [templates[2]],
      },
      {
        category: categories[1],
        templates: [templates[1]],
      },
      {
        category: categories[2],
        templates: [templates[0]],
      },
      {
        category: categories[3],
        templates: [templates[3]],
      },
      {
        category: categories[4],
        templates: [],
      },
      {
        category: categories[5],
        templates: [],
      },
      {
        category: categories[6],
        templates: [],
      }
    ];

    expect(component.categorisedTemplates).toEqual(categorisedTemplates);
  });

  it('should only show the category rows for the categories with more than 0 templates', () => {
    expect(fixture.debugElement.queryAll(By.css('.category-heading')).length).toEqual(4);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
