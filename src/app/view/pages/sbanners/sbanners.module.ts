import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
const pageRoutes: Routes = [

  {
    path: '', canActivate: [], data: { title: 'Brands' },
    children: [{ path: '', canActivate: [], data:{title:''},component: HomeComponent }
  
  ]
  }
];



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule
  ]
})
export class SbannersModule { }
