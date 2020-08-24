import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { NotificationService } from '@services/notification.service';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let routerSpy, activeRouterSpy, authServiceSpy, notificationServiceSpy;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['directLogin']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['alert']);
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                token: '1234',
                redirect: 'abc'
              })
            },
            params: of(true),
          }
        },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authServiceSpy.directLogin.and.returnValue(of({}));
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    activeRouterSpy = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
