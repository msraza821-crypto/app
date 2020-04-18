import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeRoutingModule } from './theme-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { LoaderButtonComponent } from '../pages/shared/loader-button/loader-button.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,  AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    NgbModule,
    PerfectScrollbarModule,
    TabsModule.forRoot()
    ],
  declarations: [
    LayoutComponent
  ],
  entryComponents:[]
})
export class ThemeModule { }
