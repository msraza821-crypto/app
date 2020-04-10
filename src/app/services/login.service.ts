import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { environment as ENV } from "../../environments/environment";
import { Store, select } from "@ngrx/store";
import * as AppActions from "src/app/store/actions/app.actions";
import {
    HttpErrorResponse
} from '@angular/common/http';
import { AppService } from './app.service';

@Injectable()
export class LoginService {
    user: Observable<any>;
    constructor(
        private api: ApiService,
        private store: Store<any>,
        private appSer: AppService
    ) { }
  
    login(payload: any): Observable<any> {
        return this.api.post(`${ENV.baseUrl}user/login`, payload)
            .pipe(
                map((res: any) => {
                    return res;
                })
                , catchError((error: HttpErrorResponse) =>
                    this.errorHandler(error)
                ));
    }


    loginSocial(payload: any): Observable<any> {
        return this.api.post(`${ENV.baseUrl}user/checkSocialLogin`, payload)
            .pipe(
                map((res: any) => {
                    return res;
                }) , catchError((error: HttpErrorResponse) =>
                this.errorHandler(error)
            ));            
    }
    setTempUser(data) {
        localStorage.setItem('tempUser', JSON.stringify(data));
    }
    get tempUser() {
        var data = localStorage.getItem('tempUser');
        setTimeout(() => {
            localStorage.removeItem('tempUser');
        }, 3000)
        return JSON.parse(data);
    }
    errorHandler(error) {
        if (error.status == 900) {
            this.appSer.doblocked();
      }else if(error.status==465){
       this.appSer.doblocked1();
      }else if(error.status==466){
       this.appSer.doblocked2();
      }else if(error.status==401){
       this.appSer.doblocked3();
      }
        return throwError(error);
    }
    setCurrentUser(data) {
        this.store.dispatch(new AppActions.UserSignup(data));
        localStorage.setItem("grodoctoken", data.accessToken);
    }
    get currentUser() {
        if (localStorage.getItem('grodoctoken')) {
            return this.store.pipe(select('applicationState')).subscribe(
                (appState: any) => {
                    if (appState == undefined) {
                        this.appSer.logout()
                    } else {
                        return appState.user;
                    }
                
                });
        }


    }
}