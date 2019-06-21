import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  currentPage: string;
  timelineId = '';
  programs = [];
  constructor(
    private storage: StorageService,
    private router: Router,
    public loadingController: LoadingController,
    private service: MenuService
  ) { }

  ngOnInit() {
    switch (this.router.url) {
      case '/progress':
        this.currentPage = 'progress';
        break;

      default:
        this.currentPage = 'dashboard';
        break;
    }
    this.timelineId = this.storage.getUser().timelineId;
    this.programs = [];
    this.storage.get('programs').forEach(program => {
      this.programs.push({
        id: program.timeline.id,
        name: program.program.name
      });
    });
  }

  async changeTimeline() {
    const loading = await this.loadingController.create({
      message: 'switching...'
    });
    await loading.present();
    this.service.switchTimeline(this.timelineId).subscribe(response => {
      loading.dismiss();
      location.reload();
    });
  }

  getMyImage() {
    return this.storage.getUser().image ? this.storage.getUser().image : 'https://my.practera.com/img/user-512.png';
  }

  goTo(url) {
    switch (url) {
      case 'progress':
        this.currentPage = 'progress';
        return this.router.navigate(['progress']);
        break;

      default:
        this.currentPage = 'dashboard';
        return this.router.navigate(['dashboard']);
        break;
    }

  }
}
