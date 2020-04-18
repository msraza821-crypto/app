import { Injectable } from '@angular/core';
// import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
//import { LoaderService } from '../services/loader.service';
import { HttpService } from '../service';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private _http: HttpService,
     //   public ls: LoaderService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!window.navigator.onLine) {

           // this.ls.hide()
            //  return throwError( { error: 'Internet is required.' } )
            return throwError(new HttpErrorResponse({ error: 'Internet is required.', status: 900 }));
        }

        // const cUser = this.loginService.currentUser();
        const cUser = localStorage.getItem('grodoctoken');
        if (cUser) {
            const token = cUser;
            request = request.clone({ headers: request.headers.set('accessToken', token) });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        //  console.log('request--->>>', request);
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('response--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // let data = {};
               // this.ls.hide()
                // data = {
                //     reason: error && error.error.reason ? error.error.reason : '',
                //     status: error.status
                // };
                console.log('error--->>>', error.error.errorCode);
                // this.errorDialogService.openDialog(data);
                if (error.status === 401) {
                    //this.authService.logout();
                }
                return throwError(new HttpErrorResponse({ error: 'Internet is required.', status: error.error.errorCode }));
            }));
    }
}
