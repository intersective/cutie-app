import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchResultsComponent} from './search-results.component';
import {ActivatedRoute} from '@angular/router';
import {TemplateLibraryService} from '../template-library.service';
import {of} from 'rxjs';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  const templateLibraryServiceSpy = jasmine.createSpyObj('TemplateLibraryService', ['getTemplatesByFilter']);

  const templates = [
    {
      uuid: '000f562e-0ed0-4afe-af53-7a8d20558ce1',
      name: 'Tech PM',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2252&q=80',
      leadVideoUrl: '',
      type: 'work simulation'
    },
    {
      uuid: '16c3d514-b459-b9d1-05c8-2bd1f582447c',
      name: 'XCELERY 2.0',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: 'https://images.unsplash.com/photo-1580391564590-aeca65c5e2d3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
      leadVideoUrl: '',
      type: 'internship'
    },
    {
      uuid: '16c3d514-b459-b9d1-05c8-2bd1f582447d',
      name: 'Teamnovation',
      description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
      leadImageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80',
      leadVideoUrl: '',
      type: 'team project'
    }
  ];

  const params = {
    filter: 'filter string'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(params),
          },
        },
        {
          provide: TemplateLibraryService,
          useValue: templateLibraryServiceSpy
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    templateLibraryServiceSpy.getTemplatesByFilter = jasmine.createSpy().and.returnValue(of(templates));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
