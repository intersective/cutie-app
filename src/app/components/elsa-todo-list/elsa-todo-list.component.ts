import { Component, OnInit } from '@angular/core';
import { ElsaTodoListService, TodoItem } from './elsa-todo-list.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { UtilsService } from '@services/utils.service';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-elsa-todo-list',
  templateUrl: './elsa-todo-list.component.html',
  styleUrls: ['./elsa-todo-list.component.scss'],
})
export class ElsaTodoListComponent implements OnInit {
  rows = [];
  // is getting data or not
  loading = false;

  constructor(
    private service: ElsaTodoListService,
    private pusher: PusherService,
    public utils: UtilsService,
    private router: Router,
    private storage: StorageService
  ) {
  }

  ngOnInit() {
    this.getTodoItems();
  }

  getTodoItems() {
    this.loading = true;
    this.service.getTodoItems().subscribe(todoItems => {
      const rows = [];
      todoItems.forEach(todoItem => {
        // don't display todo item that is finished
        if (todoItem.isDone) {
          return;
        }
        rows.push({
          // data needed for the issue column
          issue: {
            count: todoItem.meta.count,
            name: todoItem.name
          },
          // data needed for the action column
          action: {
            id: todoItem.id,
            identifier: todoItem.identifier,
            title: todoItem.meta.actionTitle,
            action: todoItem.meta.action,
            target: todoItem.meta.actionTarget,
            users: todoItem.meta.users
          }
        });
      });
      // trigger the data table detection
      this.rows = rows;
      this.loading = false;
    });
  }

  action(value) {
    switch (value.action) {
      case 'go':
        return window.open(value.target);

      case 'message':
        this.storage.set('todoItem', value);
        return this.router.navigate(['message']);
    }
  }

}
