import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable,throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import { environment as ENV } from "../../environments/environment";
import { AppService } from './app.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private api:ApiService,
    private loginservice:LoginService,
    private appSer:AppService
){}
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
profile():Observable<any>{
return this.api.get(`${ENV.baseUrl}user/myProfile`,)
    .pipe(
        map((res:any)=>{
        // let cToken = localStorage.get
             return res;
        })    
        , catchError((error: HttpErrorResponse) =>
        this.errorHandler(error)
    ));
}

follwers(body):Observable<any>{
  return this.api.post(`${ENV.baseUrl}user/myFollowers`,body)
      .pipe(
          map((res:any)=>{
               return res;
          })    
          , catchError((error: HttpErrorResponse) =>
          this.errorHandler(error)
      ));
  }
  follwering(body):Observable<any>{
    return this.api.post(`${ENV.baseUrl}user/myFollowing `,body)
        .pipe(
            map((res:any)=>{
                 return res;
            })    
            , catchError((error: HttpErrorResponse) =>
            this.errorHandler(error)
        ));
    }


welcomeApi(body):Observable<any>{
  return this.api.post(`${ENV.baseUrl}user/verifyAccount`,body)
      .pipe(
          map((res:any)=>{
               return res;
          })    
          , catchError((error: HttpErrorResponse) =>
          this.errorHandler(error)
      ));
  }
  
  changePassword(body):Observable<any>{
    return this.api.post(`${ENV.baseUrl}user/changePassword `,body)
        .pipe(
            map((res:any)=>{
                 return res;
            })    
            , catchError((error: HttpErrorResponse) =>
            this.errorHandler(error)
        ));
    }
  
  changeAccountType(body):Observable<any>{
    return this.api.post(`${ENV.baseUrl}user/changeVisibility `,body)
        .pipe(
            map((res:any)=>{
                 return res;
            })    
            , catchError((error: HttpErrorResponse) =>
            this.errorHandler(error)
        ));
    }
  
  changeProfilePic(body):Observable<any>{
    return this.api.post(`${ENV.baseUrl}user/changeProfilePic`,body)
        .pipe(
            map((res:any)=>{
                 return res;
            })    
            , catchError((error: HttpErrorResponse) =>
            this.errorHandler(error)
        ));
    }

  updateUserName(body):Observable<any>{
    return this.api.post(`${ENV.baseUrl}user/changeUserName `,body)
        .pipe(
            map((res:any)=>{
                 return res;
            })    
            , catchError((error: HttpErrorResponse) =>
            this.errorHandler(error)
        ));
    }
updateProfile(body):Observable<any>{
  return this.api.post(`${ENV.baseUrl}user/editProfile`,body)
      .pipe(
          map((res:any)=>{
          // let cToken = localStorage.get
               return res;
          })    
          , catchError((error: HttpErrorResponse) =>
          this.errorHandler(error)
      ));
  }
    otherUserfollwers(body):Observable<any>{
        return this.api.post(`${ENV.baseUrl}user/otherUserFollowerList`,body)
        .pipe(
            map((res:any)=>{
                return res;
            }), catchError((error: HttpErrorResponse) =>
                this.errorHandler(error)
            )
        );
    }
    otherUserfollwering(body):Observable<any>{
        return this.api.post(`${ENV.baseUrl}user/otherUserFollowingList `,body)
        .pipe(
            map((res:any)=>{
                return res;
            }), catchError((error: HttpErrorResponse) =>
                this.errorHandler(error)
            )
        );
    }
}