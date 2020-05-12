import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module;
import {DateFormatPipe} from 'src/app/pipes/date-format.pipe';
import { ChartsModule } from 'ng2-charts';

const pageRoutes: Routes = [

  {
    path: '', canActivate: [], data: { title: 'Brands' },
    children: [{ path: '', canActivate: [], data:{title:''},component:ReportsComponent },

  ]
  }
];




@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    NgxDaterangepickerMd,ChartsModule,
    RouterModule.forChild(pageRoutes)

  ]
})
export class ReportsModule { }
