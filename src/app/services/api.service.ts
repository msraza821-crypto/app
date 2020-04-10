import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
export const API_ROUTES = {
    
};

@Injectable({
    providedIn: 'root'
})
export class ApiService {
  static post(arg0: string, payload: any) {
    throw new Error("Method not implemented.");
  }
    constructor(
        private http: HttpClient,
       private ls: LoaderService
    ) {
    }
    
    getWithout(route: string, params?: any): any {
       
         return this.http.get(route, {
             params: params
         });
     }
    get(route: string, params?: any): any {
       this.ls.show();
        return this.http.get(route, {
            params: params
        });
    }
    postwithoutLoader(route: string, body: any): any {
       
         return this.http.post<any>(route, body);
     }
    post(route: string, body: any):  Observable<any> {
       this.ls.show();
        return this.http.post<any>(route, body);
    }

    postWithoutLoader(route: string, body: any):  Observable<any> {
        // this.ls.show();
         return this.http.post<any>(route, body);
     }

    put(route: string, body: any): any {
        this.ls.show();
        return this.http.put<any>(route, body);
    }

    delete(route: string, params?: any): any {
       this.ls.show();
        return this.http.delete(route, {
            params: params
        });
    }
}
