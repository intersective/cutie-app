import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { SharedModule } from '@shared/shared.module';
import { DuplicateExperienceComponent } from './duplicate-experience.component';
import { ModalController } from '@ionic/angular';

describe('DuplicateExperienceComponent', () => {
  let component: DuplicateExperienceComponent;
  let fixture: ComponentFixture<DuplicateExperienceComponent>;
  const modalSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ DuplicateExperienceComponent ],
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
    fixture = TestBed.createComponent(DuplicateExperienceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('for select()', () => {
    it('select all when all selected', () => {
      component.roleSelected = {
        admin: true,
        coordinator: true,
        mentor: true,
        participant: true,
      };
      component.select('all');
      expect(component.roleSelected).toEqual({
        admin: false,
        coordinator: false,
        mentor: false,
        participant: false,
      });
      expect(component.allSelected).toEqual(false);
    });

    it('select all when not all selected', () => {
      component.roleSelected = {
        admin: true,
        coordinator: false,
        mentor: true,
        participant: true,
      };
      component.select('all');
      expect(component.roleSelected).toEqual({
        admin: true,
        coordinator: true,
        mentor: true,
        participant: true,
      });
      expect(component.allSelected).toEqual(true);
    });

    it('select one role when not all selected', () => {
      component.roleSelected = {
        admin: true,
        coordinator: false,
        mentor: true,
        participant: true,
      };
      component.select();
      expect(component.roleSelected).toEqual({
        admin: true,
        coordinator: false,
        mentor: true,
        participant: true,
      });
      expect(component.allSelected).toEqual(false);
    });

    it('select one role when all selected', () => {
      component.roleSelected = {
        admin: true,
        coordinator: true,
        mentor: true,
        participant: true,
      };
      component.select();
      expect(component.roleSelected).toEqual({
        admin: true,
        coordinator: true,
        mentor: true,
        participant: true,
      });
      expect(component.allSelected).toEqual(true);
    });
  });

  it('for confirmed()', () => {
    component.confirmed();
    expect(modalSpy.dismiss).toHaveBeenCalled();
  });

  it('for cancel()', () => {
    component.cancel();
    expect(modalSpy.dismiss).toHaveBeenCalled();
  });
});
