import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';
import { ProfileService } from '../services/profile.service';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  cUser: any = {};
  constructor(private loginService: LoginService, private router: Router,
    private appSer: AppService, private profileService: ProfileService) {
    console.log("inside AuthGuardService")
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var currentUser = localStorage.getItem("grodoctoken");
    if (currentUser) {
      // let accesstoken= JSON.parse(localStorage.getItem('currentUser')).accessToken;
      this.profileService.profile().subscribe(res => {
        if (res.success == true) {
          this.loginService.setCurrentUser(res.result)
          this.cUser = this.loginService.currentUser;
          return true;
        } else {
          this.appSer.logout();
          return false;
        }
      })
    } else {
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      this.appSer.logout();
      return false;
    }


  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    var currentUser = localStorage.getItem("grodoctoken");
    if (currentUser) {
      this.profileService.profile().subscribe(res => {
        if (res.success == true) {
          this.loginService.setCurrentUser(res.result)
           return true;
        } else {
          this.appSer.logout();
          return false;
        }
      })

    } else {
      this.router.navigate(['/home'])
      return false
    }
  }
}
