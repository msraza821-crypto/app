import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap,retry, map, } from 'rxjs/operators';
// Modules
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { environment } from 'src/environments/environment';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private_key;
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router,
    private appSer: AppService, public appStateSer: AppStateService) {
  } 

  private extractData(res) {
    return res || {};
  }
  // ------------------------------------------------------//
  get httpOptionsAuth() {
    return {
      headers: new HttpHeaders({
       // 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('chicbeetoken'),
        'token':localStorage.getItem('chicbeetoken')
      })
    };
  }
  get httpOptionsAuth2() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('chicbeetoken'),
        'token':localStorage.getItem('chicbeetoken')
      })
    };
  }
  get httpOptionsAuth3() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('chicbeetoken'),
        'token':localStorage.getItem('chicbeetoken')
      })
    };
  }
  // ------------------------------------------------------//
  get httpOptionsUnauth() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       
      })
    };
  }

  httpOptionsAuth1() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('chicbeetoken'),
        'token':localStorage.getItem('chicbeetoken')
      })
    };
  } 

  
  postReqAuths(url: string, body: any): Observable<any> {
    const reqUrl = this.baseUrl + url;

    var test= this.http.post(reqUrl, body, this.httpOptionsAuth1())
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
      return test;
  }
  postReqUnauth(url: string, body: any) {
    const reqUrl = this.baseUrl + url;
    return this.http.post(reqUrl, body, this.httpOptionsUnauth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }
  postReqAuth(url: string, body: any): Observable<any> {
    const reqUrl = this.baseUrl + url;
    var test= this.http.post(reqUrl, body, this.httpOptionsAuth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
      return test;
  }
  putReqAuth(url: string, body: any): Observable<any> {
    const reqUrl = this.baseUrl + url;
    var test= this.http.put(reqUrl, body, this.httpOptionsAuth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
      return test;
  }
  putReqAuth2(url: string, body: any): Observable<any> {
    const reqUrl = this.baseUrl + url;
    var test= this.http.put(reqUrl, body, this.httpOptionsAuth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
      return test;
  }
  postReqAuth2(url: string, body: any): Observable<any> {
    const reqUrl = this.baseUrl + url;
    var test= this.http.post(reqUrl, body, this.httpOptionsAuth2)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
      return test;
  }
  getReqAuth(url: string) {
    this.appSer.showLoader();
    const reqUrl = this.baseUrl + url;
    var test= this.http.get(reqUrl, this.httpOptionsAuth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
    return test;
  }
  getReqAuthExport(url: string) {
    const reqUrl= this.baseUrl + url;
    const headers= new HttpHeaders({
        'Content-Type': 'text/plain; charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem('chicbeetoken'),
        'token':localStorage.getItem('chicbeetoken')
    })
    return this.http.get(reqUrl, { headers, responseType: 'text' as 'json'}).pipe(tap((res) => { }),
      map(this.extractData),
      catchError(this.handleError),
    );
  }
  getReqAuthLogout(url: string) {
    this.appSer.showLoader();
    const reqUrl = this.baseUrl + url;
    var test= this.http.get(reqUrl, this.httpOptionsAuth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError1(err)));
  return test;
  }
  getReqAuthss(url: string) {
    this.appSer.showLoader();
    const reqUrl = this.baseUrl + url;
    var test= this.http.get(reqUrl, this.httpOptionsAuth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
    return test;
  }
  getReqUnauth(url: string) {
    const reqUrl = this.baseUrl + url;
    return this.http.get(reqUrl, this.httpOptionsUnauth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }
  // ------------------------------------------------------//
  getReqAuthValidation(url: string) {
    const reqUrl = this.baseUrl + url;
    return this.http.get(reqUrl, this.httpOptionsAuth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }
  patchReqAuth(url: string, body: any) {
    const reqUrl = this.baseUrl + url;
    var test= this.http.patch(reqUrl, body, this.httpOptionsAuth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
      return test;
  }
  patchReqUnauth(url: string, body: any) {
    const reqUrl = this.baseUrl + url;
    return this.http.patch(reqUrl, body, this.httpOptionsUnauth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }
  deleteReqAuth(url: string) {
    const reqUrl = this.baseUrl + url;
    var test= this.http.delete(reqUrl, this.httpOptionsAuth)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
    return test;
  }
  // ------------------------------------------------------//
  private handleError(err) {
    if (err.status === 900) {
      this.appSer.doblocked();
    }  else if(err.status===466){
      this.appSer.doblocked1();
    }else if(err.status===401){
      this.appSer.doblocked2();
    }
    return of(err.error);
  }
  private handleError1(err){
    return of(err.error);
  }
  exportCategoryService(url) {
    // const reqUrl = this.baseUrl + url;
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // return this.http.get(`${reqUrl}`, { headers, responseType: 'text' as 'json' }).pipe(tap((res) => { }),
    //   map(this.extractData),
    //   catchError(this.handleError),
    // );
  }
getReqAuthIP(url: string) {
  this.appSer.showLoader();
  const reqUrl = url;
  return this.http.get(reqUrl,this.httpOptionsUnauth)
    .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
}
getReqAuthBrands(url: string) {
  this.appSer.showLoader();
  const reqUrl = this.baseUrl + url;
  return this.http.get(reqUrl,this.httpOptionsAuth)
    .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
}

}
