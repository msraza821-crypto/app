import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
;
import * as AppActions from 'src/app/store/actions/app.actions';
import { AppService } from '../service/app.service';
import { HttpService } from '../service';
@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanLoad {
  constructor(private store: Store<any>, private router: Router,
    private appSer: AppService,
private _api:HttpService) {

  }
  
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      if (localStorage.getItem('chicbeetoken')) {
       this._api.getReqAuth('admin/profile-detail').subscribe(
         (res: any) => {
           if (res && res.status == true) {
               this.store.dispatch(new AppActions.UserSignup(res.result));            
            //   localStorage.setItem('chicbeetoken', res.result.user.accessToken.token);
             resolve(true);
             }else {
              this.appSer.logout();
              resolve(false);
             }           
         },
         (err) => {
          this.appSer.logout();
          resolve(false);
         }
       );
       }else{
        // alert();
        this.appSer.logout();
        resolve(false);
       }
 
     });
   }
   
  
}
