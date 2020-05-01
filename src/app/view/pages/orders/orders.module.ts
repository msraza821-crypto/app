import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';

import { SharedModule } from '../shared/shared.module';
import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderViewComponent } from './orders/order-view/order-view.component'; // <-- import the module
const pageRoutes: Routes = [

  {
    path: '', canActivate: [], data: { title: 'Orders' },
    children: [{ path: '', canActivate: [], data:{title:''},component: OrdersComponent },
    { path:'view',canActivate:[],data:{title: "View"}, component:OrderViewComponent}
  ]
  }
];





@NgModule({
  imports: [
    NgxPaginationModule, NgxDaterangepickerMd,
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),

  ],
  declarations: [OrdersComponent, OrderViewComponent],
  entryComponents: []
})
export class OrdersModule { }


