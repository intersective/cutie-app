import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { environment } from '@environments/environment';
import { StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private storage: StorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // demo data
    if (environment.demo) {
      if (!this.storage.getUser().apikey || !this.storage.getUser().apikey.includes('demo-apikey') || !this.storage.get('expire')) {
        // the first time go to the app, demo direct login page
        this.router.navigate(['auth', 'demo']);
      } else {
        // if it expired, demo direct login page
        const expire = new Date(this.storage.get('expire'));
        const now = new Date();
        if (now > expire) {
          this.router.navigate(['auth', 'demo']);
        }
      }
      return true;
    }
    // not allow any page if there's no apikey
    if (!this.storage.getUser().apikey) {
      this.router.navigate(['error']);
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

}
