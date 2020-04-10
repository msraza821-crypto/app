import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
;
import * as AppActions from 'src/app/store/actions/app.actions';
import { AppService } from '../services/app.service';
import { ProfileService } from '../services/profile.service';
import { LoaderService } from 'src/app/services/loader.service';
@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanLoad {
  constructor(private store: Store<any>, private router: Router,
    private appSer: AppService,private profileService:ProfileService,private ls:LoaderService) {

  }
  
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
   return new Promise((resolve) => {

      // If no token found
      
      if (localStorage.getItem('grodoctoken')) {
        this.profileService.profile().subscribe(res=>{
          if(res.success==true){
            //console.log(res.success)
              this.store.dispatch(new AppActions.UserSignup(res.result));
              localStorage.setItem('grodoctoken', res.result.accessToken);
              this.ls.hide();
             // if(res.result.address && res.result.address!=""){
                resolve(true);
              //}else{
               // this.router.navigate(['profile/set-location'])
              // }
             
            
          } else {
           resolve(true);
          }
        },
        (err) => {
          resolve(true);
        }
        
      );
      
     
      }else{
       // alert();
        resolve(true);
      }

    });
  }
  
}
