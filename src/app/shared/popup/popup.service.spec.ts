import { TestBed } from '@angular/core/testing';
import { PopupService } from './popup.service';
import { of, throwError } from 'rxjs';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { UtilsService } from '@services/utils.service';

describe('PopupService', () => {
  let service: PopupService;
  const modalSpy = jasmine.createSpyObj('ModalController', ['dismiss', 'create']);
  const alertSpy = jasmine.createSpyObj('AlertController', ['create']);
  const toastSpy = jasmine.createSpyObj('ToastController', ['create']);
  const loadingSpy = jasmine.createSpyObj('LoadingController', ['create', 'dismiss']);
  const utilsSpy = jasmine.createSpyObj('UtilsService', ['getEvent']);
  utilsSpy.getEvent = jasmine.createSpy().and.returnValue({
    subscribe: () => {}
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PopupService,
        { provide: ModalController, useValue: modalSpy },
        { provide: AlertController, useValue: alertSpy },
        { provide: ToastController, useValue: toastSpy },
        { provide: LoadingController, useValue: loadingSpy },
        { provide: UtilsService, useValue: utilsSpy },
      ]
    });
    service = TestBed.inject(PopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(utilsSpy.getEvent).toHaveBeenCalledTimes(2);
  });

  it('call dismiss()', () => {
    service.dismiss();
    expect(modalSpy.dismiss).toHaveBeenCalled();
  });

  describe('call showModal()', () => {
    beforeEach(() => {
      modalSpy.create = jasmine.createSpy().and.returnValue({
        onDidDismiss: () => Promise.resolve(),
        present: () => {},
      });
    });

    afterEach(() => {
      expect(modalSpy.create).toHaveBeenCalled();
    });

    it('no event', async () => {
      await service.showModal('component', 'props');
    });

    it('have event', async () => {
      await service.showModal('component', 'props', null, 'event');
    });
  });

  it('call showAlert()', async () => {
    alertSpy.create = jasmine.createSpy().and.returnValue({ present: () => {} });
    await service.showAlert(null);
    expect(alertSpy.create).toHaveBeenCalled();
  });

  it('call showToast()', async () => {
    toastSpy.create = jasmine.createSpy().and.returnValue({ present: () => {} });
    await service.showToast('');
    expect(toastSpy.create).toHaveBeenCalled();
  });

  it('call showLoading()', async () => {
    loadingSpy.create = jasmine.createSpy().and.returnValue({ present: () => {} });
    await service.showLoading(null);
    expect(loadingSpy.create).toHaveBeenCalled();
  });

  it('call dismissLoading()', () => {
    service.loading = { dismiss: jasmine.createSpy() };
    service.dismissLoading();
    expect(service.loading.dismiss).toHaveBeenCalled();
  });

  it('call showDescription()', async () => {
    await service.showDescription('title', 'content');
    expect(modalSpy.create).toHaveBeenCalled();
  });

  it('call showTags()', async () => {
    await service.showTags({ tags: '', type: '', data: '', title: '' });
    expect(modalSpy.create).toHaveBeenCalled();
  });

  it('call showTagsView()', async () => {
    await service.showTagsView({ tags: '', title: '' });
    expect(modalSpy.create).toHaveBeenCalled();
  });

  it('call showCreateExp()', async () => {
    await service.showCreateExp();
    expect(modalSpy.create).toHaveBeenCalled();
  });

  it('call showDuplicateExp()', async () => {
    await service.showDuplicateExp('1');
    expect(modalSpy.create).toHaveBeenCalled();
  });

  it('call showDeleteTemplate()', async () => {
    await service.showDeleteTemplate({uuid: 'abc123', name: 'name'});
    expect(modalSpy.create).toHaveBeenCalled();
  });

});
