import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/pages/login/login.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './_interceptor/httpconfig.interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { appReducer } from './store/reducers/app.reducer';

import { ForgotComponent } from './view/pages/forgot/forgot.component';
import { ResetComponent } from './view/pages/reset/reset.component';
import { LoaderButtonComponent } from './view/pages/shared/loader-button/loader-button.component';
import { LoaderComponent } from './view/pages/shared/loader/loader.component';
import { CommonUtil } from './util';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpService, AppService  } from "./service";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxSpinnerModule } from "ngx-spinner";
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';


import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    ResetComponent,
    LoaderButtonComponent,
    LoaderComponent  
  ],
  imports: [
    NgxPaginationModule,RichTextEditorAllModule,
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    NgbModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    ChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      applicationState: appReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
   // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
   LoaderButtonComponent,
   LoaderComponent
  ],
  
  providers: [CommonUtil,AppService,HttpService,  { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],


})
export class AppModule { }