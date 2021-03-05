import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { SharedModule } from '@shared/shared.module';
import { CreateExperienceComponent } from './create-experience.component';
import { ModalController } from '@ionic/angular';

describe('CreateExperienceComponent', () => {
  let component: CreateExperienceComponent;
  let fixture: ComponentFixture<CreateExperienceComponent>;
  const modalSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ CreateExperienceComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ModalController,
          useValue: modalSpy,
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExperienceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('for comfirmed()', () => {
    component.browse();
    expect(modalSpy.dismiss).toHaveBeenCalled();
  });

});
