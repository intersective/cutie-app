import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RequestService } from '@shared/request/request.service';
import { StorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
// import { DemoService } from '@services/demo.service';

describe('AuthService', () => {
  let service: AuthService;
  let requestSpy;
  let storageSpy;
  let utilSpy;
  // let DemoSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['get', 'post', 'graphQLQuery', 'graphQLMutate', 'apiResponseFormatError'])
        },
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', ['clear', 'setUser', 'set'])
        },
        {
          provide: UtilsService,
          useValue: jasmine.createSpyObj('UtilsService', ['has'])
        },
      ]
    });
    service = TestBed.inject(AuthService);
    requestSpy = TestBed.inject(RequestService);
    storageSpy = TestBed.inject(StorageService);
    utilSpy = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
