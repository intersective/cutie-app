import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TemplateLibraryHomeComponent} from './template-library-home.component';
import {TemplateLibraryService} from '../template-library.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';

describe('TemplateLibraryHomeComponent', () => {
  let component: TemplateLibraryHomeComponent;
  let fixture: ComponentFixture<TemplateLibraryHomeComponent>;
  const templateLibraryServiceSpy = jasmine.createSpyObj('TemplateLibraryService', ['getTemplates', 'getCategories']);
  const routerSpy = { navigate: jasmine.createSpy('navigate') };

  const templates = [
    {
      uuid: '000f562e-0ed0-4afe-af53-7a8d20558ce1',
      name: 'Tech PM',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2252&q=80',
      leadVideoUrl: '',
      institutionUUID: '70fa9823-2e44-4557-a690-8b4987160741',
      isPublic: true,
      type: 'work simulation',
      attributes: [],
      modified: 'Thu Oct 29 2015 08:46:30'
    },
    {
      uuid: '16c3d514-b459-b9d1-05c8-2bd1f582447c',
      name: 'XCELERY 2.0',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: 'https://images.unsplash.com/photo-1580391564590-aeca65c5e2d3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
      leadVideoUrl: '',
      institutionUUID: '439cb0b9-0158-4285-9bea-79b5abfc9995',
      isPublic: true,
      type: 'internship',
      attributes: [],
      modified: 'Thu Oct 29 2015 08:46:30'
    },
    {
      uuid: '16c3d514-b459-b9d1-05c8-2bd1f582447d',
      name: 'Teamnovation',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80',
      leadVideoUrl: '',
      institutionUUID: '17c63901-8144-461e-b20b-15814b6c816f',
      isPublic: true,
      type: 'team project',
      attributes: [{
        name: 'apple'
      },
        {
          name: 'banana'
        },
        {
          name: 'watermelon'
        }],
      modified: 'Thu Oct 29 2015 08:46:30'
    }
  ];

  const categories = [
    {
      'leadImage': '',
      'name': 'Team Projects',
      'type': 'team project',
      'color': 'rgba(0,64,229, 0.7)',
      'size': 0
    },
    {
      'leadImage': '',
      'name': 'Internships',
      'type': 'internship',
      'color': 'rgba(85, 2, 136, 0.7)',
      'size': 0
    },
    {
      'leadImage': '',
      'name': 'Simulations',
      'type': 'simulation',
      'color': 'rgba(229, 69, 0, 0.7)',
      'size': 0
    },
    {
      'leadImage': '',
      'name': 'Mentoring',
      'type': 'mentoring',
      'color': 'rgba(221, 0, 59, 0.7)',
      'size': 1
    },
    {
      'leadImage': '',
      'name': 'Accelerators',
      'type': 'accelerator',
      'color': 'rgba(37, 105, 120, 0.7)',
      'size': 1
    },
    {
      'leadImage': '',
      'name': 'Skills Portfolios',
      'type': 'skill portfolio',
      'color': 'rgba(9, 129, 7, 0.7)',
      'size': 1
    },
    {
      'leadImage': '',
      'name': 'Others',
      'type': 'other',
      'color': 'rgba(69, 40, 48, 0.7)',
      'size': 1
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
});
