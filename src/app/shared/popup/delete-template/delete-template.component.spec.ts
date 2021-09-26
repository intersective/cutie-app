import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTemplateComponent } from './delete-template.component';
import {ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TemplateLibraryService} from '../../../template-library/template-library.service';
import {of} from 'rxjs';

describe('DeleteTemplateComponent', () => {
  let component: DeleteTemplateComponent;
  let fixture: ComponentFixture<DeleteTemplateComponent>;
  const modalSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const routerSpy = { navigate: jasmine.createSpy('navigate') };
  const templateLibraryServiceSpy = jasmine.createSpyObj('TemplateLibraryService', ['deleteTemplate']);
  const toastSpy = jasmine.createSpyObj('ToastController', ['create', 'present']);

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
    isPublic: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTemplateComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ModalController,
          useValue: modalSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: TemplateLibraryService,
          useValue: templateLibraryServiceSpy,
        },
        {
          provide: ToastController,
          useValue: toastSpy,
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTemplateComponent);
    toastSpy.create = jasmine.createSpy().and.returnValue(new Promise(() => {
      return ({present: () => {}});
    }));
    // toastSpy.present = jasmine.createSpy().and.returnValue(of(null));
    component = fixture.componentInstance;
    component.template = template;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Calling cancel should dismiss to modal', () => {
    component.cancel();
    expect(modalSpy.dismiss).toHaveBeenCalled();
  });

  it('Calling showToast should create a toast', () => {
    component.showToast('message', true);
    expect(toastSpy.create).toHaveBeenCalled();
  });

  it('Calling confirmed call delete template in the template service', () => {
    templateLibraryServiceSpy.deleteTemplate = jasmine.createSpy().and.returnValue(of({success: true, message: 'message'}));
    component.confirmed();
    expect(templateLibraryServiceSpy.deleteTemplate).toHaveBeenCalledWith(template.uuid);
  });

  it('A successful delete should navigate back to the templates and create a toast', () => {
    templateLibraryServiceSpy.deleteTemplate = jasmine.createSpy().and.returnValue(of({success: true, message: 'message'}));
    component.confirmed();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/templates']);
    expect(toastSpy.create).toHaveBeenCalled();
  });

  it('A unsuccessful delete create a toast', () => {
    templateLibraryServiceSpy.deleteTemplate = jasmine.createSpy().and.returnValue(of({success: false, message: 'message'}));
    component.confirmed();
    expect(toastSpy.create).toHaveBeenCalledWith({ message: 'message', duration: 2000, position: 'top', color: 'danger' });
  });

});
