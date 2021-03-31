import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateExperienceCardComponent } from './template-experience-card.component';

describe('TemplateExperienceCardComponent', () => {
  let component: TemplateExperienceCardComponent;
  let fixture: ComponentFixture<TemplateExperienceCardComponent>;

  const template = {
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
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateExperienceCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateExperienceCardComponent);
    component = fixture.componentInstance;
    component.template = template;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
