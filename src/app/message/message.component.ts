import { Component } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MessageService } from './message.service';
import { NotificationService } from '@services/notification.service';
import { RouterEnter } from '@services/router-enter.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent extends RouterEnter {
  routeUrl = '/message';
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
    public router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
    private service: MessageService,
    private loadingController: LoadingController,
    private notification: NotificationService
  ) {
    super(router);
  }

  onEnter() {
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
      this.templates = templates;
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
    this.router.navigate(['/dashboard']);
  }

  changeTemplate() {
    const t = this.templates.find(tmp => tmp.name === this.template);
    this.smsContent = t.sms;
    this.emailContent = t.email;
  }

  /**
   * Send message
   */
  async send() {
    const loading = await this.loadingController.create({
      message: 'sending...'
    });
    await loading.present();

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
      toTeam: this.todoItem.isTeam,
      sms: this.smsContent,
      email: this.emailContent
    }
    this.service.sendMessage(data).subscribe(
      response => {
        loading.dismiss();
        this.notification.alert({
          message: 'Messages have been sent successfully.',
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              handler: () => {
                this.router.navigate(['/dashboard']);
              }
            }
          ]
        });
      },
      err => {
        loading.dismiss();
        this.notification.alert({
          message: 'Sending messages failed, please try again later.',
          buttons: [
            {
              text: 'OK',
              role: 'cancel'
            }
          ]
        });
      }
    );
  }

}
