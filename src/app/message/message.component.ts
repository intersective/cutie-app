import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  title: string;
  todoItem: any;
  // users list
  users: {
    id: number;
    name: string;
    checked: boolean;
  }[];
  templates: {
    name: string;
    sms: string;
    email: string;
  }[];
  // selected template
  template: string;
  smsContent: string;
  emailContent: string;
  constructor(
    private router: Router,
    private storage: StorageService,
    private service: MessageService,
  ) { }

  ngOnInit() {
    this.users = [];
    this.todoItem = this.storage.get('todoItem');
    this.todoItem.users.forEach(user => {
      this.users.push({
        id: user.user_id,
        name: user.user_name,
        checked: true
      });
    });
    this.title = this.todoItem.title;
    this.service.getMessageTemplates(this.todoItem.identifier).subscribe(templates => {
      this.templates = templates;console.log(this.templates);
      // display the last template as the default template
      const defaultTmp = templates[templates.length - 1];
      this.template = defaultTmp.name;
      this.smsContent = defaultTmp.sms;
      this.emailContent = defaultTmp.email;
    });
  }

  /**
   * Go back to dashboard
   */
  back() {
    this.router.navigate(['']);
  }

  changeTemplate() {
    const t = this.templates.find(tmp => tmp.name === this.template);
    this.smsContent = t.sms;
    this.emailContent = t.email;
  }

  /**
   * Send message
   */
  send() {
    const users = [];
    this.users.forEach(user => {
      if (user.checked) {
        users.push(user.id);
      }
    });
    const data = {
      id: this.todoItem.id,
      type: 'message',
      entities: users,
      sms: this.smsContent,
      email: this.emailContent
    }
    console.log(data);
  }

}
