import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as AppActions from 'src/app/store/actions/app.actions';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class AppService {
  blocked: Subject<boolean> = new Subject();
  blocked1: Subject<boolean> = new Subject();
  blocked2: Subject<boolean> = new Subject();
  blocked3: Subject<boolean> = new Subject();
  constructor(private router: Router,
    private store: Store<any>,
    @Inject(DOCUMENT) private document: any) {
  }
  logout() {
    localStorage.removeItem('grodoctoken');
    localStorage.clear();
    this.store.dispatch(new AppActions.UserLogout());
    this.router.navigate(['/home']);
  }
  doblocked() {
    //alert()
    this.blocked.next(true);
  }
  doblocked1() {
  //  alert()
    this.blocked1.next(true);
  }
  doblocked2() {
    //alert()
    this.blocked2.next(true);
  }
  doblocked3() {
    //alert()
    this.blocked3.next(true);
  }

}
