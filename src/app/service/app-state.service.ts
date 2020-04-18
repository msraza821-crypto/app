import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor(private store: Store<any>) {

  }

  get appState(): Observable<any> {
    return this.store.pipe(select('applicationState'));
  }

  



}
