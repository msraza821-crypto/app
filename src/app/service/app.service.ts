
import { Injectable ,Inject} from '@angular/core';

// Rxjs Operators
import { Subject } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as AppActions from '../store/actions/app.actions';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry, map, } from 'rxjs/operators';

@Injectable()
export class AppService {

  private loader: Subject<boolean> = new Subject();
  blocked: Subject<boolean> = new Subject();
  blocked1:Subject<boolean> = new Subject();
  blocked2:Subject<boolean> = new Subject();
  blocked3:Subject<boolean> = new Subject();
  load = this.loader.asObservable();
  constructor(private router: Router, 
   // private _api: HttpService,
   private http: HttpClient,
    private store: Store<any>,@Inject(DOCUMENT) private document: any) {

  }


 

  showLoader() {
    this.loader.next(true);
  }

  hideLoader() {
    this.loader.next(false);
  }

  redirectToPackage() {
    this.router.navigate(['/dashboard']);
  }
  get httpOptionsAuth() {
    return {
      headers: new HttpHeaders({
       // 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('chicbeetoken'),
        'token':localStorage.getItem('chicbeetoken')
      })
    };
  }
  
  baseUrl: string = environment.baseUrl;
  logout() {
  
    this.store.dispatch(new AppActions.UserLogout());
    var url="admin/logout";
    var body={};
    const reqUrl = this.baseUrl + url;
    this.http.put(reqUrl, body, this.httpOptionsAuth)
    .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
    localStorage.removeItem('chicbeetoken');
   // localStorage.clear();
    this.router.navigate(['/login']);
  }
  private handleError(err) {
    if (err.status === 900) {
      this.doblocked();
    }  else if(err.status===466){
      this.doblocked1();
    }else if(err.status===401){
      this.doblocked2();
    }
    return of(err.error);
  }

  doblocked() {
    this.blocked.next(true);
  }
  doblocked1() {
    this.blocked1.next(true);
  }
  doblocked2() {
    this.blocked2.next(true);
  }
  doblocked3() {
    this.blocked3.next(true);
  }
}
