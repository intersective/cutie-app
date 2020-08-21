import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { RequestService } from '@shared/request/request.service';
import { DemoService } from '@services/demo.service';

describe('MessageService', () => {
  let service: MessageService;
  let requestServiceSpy: jasmine.SpyObj<RequestService>;
  let demoServiceSpy: jasmine.SpyObj<DemoService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['get', 'post'])
        },
        {
          provide: DemoService,
          useValue: jasmine.createSpyObj('DemoService', ['getMessageTemplates'])
        }
      ]
    });
    service = TestBed.get(MessageService);
    requestServiceSpy = TestBed.get(RequestService);
    demoServiceSpy = TestBed.inject(DemoService) as jasmine.SpyObj<DemoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
