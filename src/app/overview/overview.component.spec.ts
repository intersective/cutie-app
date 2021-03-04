import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SharedModule } from '@shared/shared.module';
import { OverviewComponent } from './overview.component';
import { OverviewService } from './overview.service';
import { UtilsService } from '@services/utils.service';
import { PopupService } from '@shared/popup/popup.service';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  const overviewSpy = jasmine.createSpyObj('OverviewService', ['getExperiences']);
  const utilsSpy = jasmine.createSpyObj('UtilsService', ['getEvent']);
  const popupSpy = jasmine.createSpyObj('PopupService', ['showCreateExp']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ OverviewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: OverviewService,
          useValue: overviewSpy
        },
        {
          provide: UtilsService,
          useValue: utilsSpy
        },
        {
          provide: PopupService,
          useValue: popupSpy
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    overviewSpy.getExperiences = jasmine.createSpy().and.returnValue(of());
    utilsSpy.getEvent = jasmine.createSpy().and.returnValue(of());
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


});
