import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';

import { SharedModule } from '../shared/shared.module';
import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
const pageRoutes: Routes = [

  {
    path: '', canActivate: [], data: { title: 'Orders' },
    children: [{ path: '', canActivate: [], data:{title:''},component: OrdersComponent },
  ]
  }
];





@NgModule({
  imports: [
    NgxPaginationModule, NgxDaterangepickerMd,
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),

  ],
  declarations: [OrdersComponent],
  entryComponents: []
})
export class OrdersModule { }


