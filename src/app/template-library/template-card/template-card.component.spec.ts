import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCardComponent } from './template-card.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('TemplateCardComponent', () => {
  let component: TemplateCardComponent;
  let fixture: ComponentFixture<TemplateCardComponent>;

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
      imports: [RouterTestingModule],
      declarations: [ TemplateCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCardComponent);
    component = fixture.componentInstance;
    component.template = template;
    component.skeleton = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
