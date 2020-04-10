import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/pages/login/login.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './_interceptor/httpconfig.interceptor';
import { ProfileService } from './services/profile.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { appReducer } from './store/reducers/app.reducer';
import { AppService } from './services/app.service';
import { ForgotComponent } from './view/pages/forgot/forgot.component';
import { ResetComponent } from './view/pages/reset/reset.component';
import { LoaderButtonComponent } from './view/pages/shared/loader-button/loader-button.component';
import { LoaderComponent } from './view/pages/shared/loader/loader.component';
import { CommonUtil } from './util';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};




import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';


// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
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

    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
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
  
  providers: [CommonUtil,LoginService, ProfileService,AppService,  { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent],


})
export class AppModule { }