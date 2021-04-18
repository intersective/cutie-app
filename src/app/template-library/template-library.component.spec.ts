import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TemplateLibraryComponent} from './template-library.component';
import {TemplateLibraryService} from './template-library.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('TemplateLibraryComponent', () => {
  let component: TemplateLibraryComponent;
  let fixture: ComponentFixture<TemplateLibraryComponent>;
  const templateLibraryServiceSpy = jasmine.createSpyObj('TemplateLibraryService', ['getCategories']);

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
      imports: [RouterTestingModule],
      declarations: [ TemplateLibraryComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: TemplateLibraryService,
          useValue: templateLibraryServiceSpy
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateLibraryComponent);
    component = fixture.componentInstance;
    templateLibraryServiceSpy.getCategories = jasmine.createSpy().and.returnValue(categories);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
