import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AppActions from 'src/app/store/actions/app.actions';
import { AppService } from '../services/app.service';
import { ProfileService } from '../services/profile.service';
import { LoginService } from '../services/login.service';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {
  constructor(private store: Store<any>,
    private router: Router,
    private LoaderService:LoaderService,
    private appSer: AppService,
    private profileService: ProfileService,
    private LoginService:LoginService) {

  }
  
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
   return new Promise((resolve) => {

      // If no token found

      console.log(localStorage.getItem("grodoctoken"))

      if (!localStorage.getItem('grodoctoken')) {
        this.appSer.logout();
        resolve(false);
      }else {     
        this.profileService.profile().subscribe(res => {
          if (res.success == true) {
            this.LoginService.setCurrentUser(res.result)
            this.LoaderService.hide();
            // if(res.result.address && res.result.address!=""){
              resolve(true);
            // }else{
            //   this.router.navigate(['profile/set-location'])
            // }
          } else {
            this.appSer.logout();
            resolve(false);
          }
        } 
        ,
        (err) => {
          this.appSer.logout();
          resolve(false);
        }
      );
      }

    });
  }
}
