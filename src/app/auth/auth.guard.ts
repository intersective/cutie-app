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
    if (environment.demo && (!this.storage.getUser().apikey || this.storage.getUser().apikey !== 'demo-apikey')) {
      this.router.navigate(['auth', 'demo']);
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

}