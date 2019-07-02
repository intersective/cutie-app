import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RequestService } from '@shared/request/request.service';

import { ElsaTodoListService } from './elsa-todo-list.service';

describe('ElsaTodoListService', () => {
  let service: ElsaTodoListService;
  let requestServiceSpy: jasmine.SpyObj<RequestService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ElsaTodoListService,
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['get'])
        }
      ]
    });
    service = TestBed.get(ElsaTodoListService);
    requestServiceSpy = TestBed.get(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected todoItems', async() => {
    const todoItemsResponse = {
      data: [
        {
          id: 1,
          name: 'name',
          identifier: 'identifier',
          is_done: false,
          meta: {
            count: 2,
            action: 'message',
            action_title: 'remind students',
            is_team: false,
            users: [
              {
                user_id: 1,
                user_name: 'student name',
                user_email: 'user@practera.com',
                action_taken: false
              }
            ]
          }
        }
      ]
    };
    const expectedReturn = [
      {
        id: todoItemsResponse.data[0].id,
        name: todoItemsResponse.data[0].name,
        identifier: todoItemsResponse.data[0].identifier,
        isDone: todoItemsResponse.data[0].is_done,
        meta: {
          count: todoItemsResponse.data[0].meta.count,
          action: todoItemsResponse.data[0].meta.action,
          actionTitle: todoItemsResponse.data[0].meta.action_title,
          actionTarget: null,
          isTeam: todoItemsResponse.data[0].meta.is_team,
          users: todoItemsResponse.data[0].meta.users
        }
      }
    ];
    requestServiceSpy.get.and.returnValue(of(todoItemsResponse));

    service.getTodoItems().subscribe(
      todoItems => expect(todoItems).toEqual(expectedReturn, 'expected todoItems'),
      fail
    );
    expect(requestServiceSpy.get.calls.count()).toBe(1, 'one call');
  });

});
