import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDetailsComponent } from './template-details.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {TemplateLibraryService} from '../template-library.service';
import {By} from '@angular/platform-browser';

describe('TemplateDetailsComponent', () => {
  let component: TemplateDetailsComponent;
  let fixture: ComponentFixture<TemplateDetailsComponent>;
  const templateLibraryServiceSpy = jasmine.createSpyObj('TemplateLibraryService', ['getTemplate', 'importExperience']);

  const params = {
    templateId: 'abc123'
  };

  const template = {
    uuid: '000f562e-0ed0-4afe-af53-7a8d20558ce1',
    name: 'Consulting Project Experience',
    description: `Practera is the leading platform to power high quality experiential learning programs.<br/>Deliver experiential learning programs at larger scale and lower cost<br/>Customisable platform to author, launch & manage programs<br/>Connect students to industry projects, internships & experiences<br/>Expert course design, configuration and deployment services`,
    leadImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2252&q=80',
    leadVideoUrl: 'https://cdn.videvo.net/videvo_files/video/free/2013-08/small_watermarked/hd0992_preview.webm',
    type: 'work simulation',
    attributes: ['teambased projects', '12-weeks', 'feedback loops'],
    designMapUrl: '/assets/icon/favicon.png',
    operationsManualUrl: '/assets/icon/logo.svg',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDetailsComponent ],
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
    fixture = TestBed.createComponent(TemplateDetailsComponent);
    component = fixture.componentInstance;
    templateLibraryServiceSpy.getTemplate = jasmine.createSpy().and.returnValue(of(template));
    templateLibraryServiceSpy.importExperience = jasmine.createSpy().and.returnValue(of({experienceUuid: 'abc123'}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render skeleton when it is loading the template', () => {
    component.loadingTemplate = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('ion-skeleton-text'))).toBeTruthy();
  });

  it('should not render skeleton when it is not loading the template', () => {
    component.loadingTemplate = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('ion-skeleton-text'))).toBeNull();
  });

  it('should render template name', () => {
    component.loadingTemplate = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.template-title')).nativeElement.innerText).toEqual(template.name);
  });

  it('should call import experience', () => {
    component.importTemplate('abc123');
    expect(templateLibraryServiceSpy.importExperience).toHaveBeenCalledWith('abc123');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
