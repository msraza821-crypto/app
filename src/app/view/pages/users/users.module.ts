import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';

import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ViewUserComponent } from './view-user/view-user.component';
import { UserOrderViewComponent } from './user-order-view/user-order-view.component';
import { UserTransactionComponent } from './user-transaction/user-transaction.component';
import { MomentModule } from 'ngx-moment';
import {DateFormatPipe} from 'src/app/pipes/date-format.pipe';
const pageRoutes: Routes = [

  { path: '', 
   data: { title: 'Users' },
  children: [
    {
      path: '',
      component: UsersComponent ,data:{title:''},
    },{ path: 'view', canActivate: [], data: { title: 'View User' }, component: ViewUserComponent },
    {path:'order-view',canActivate:[],data:{title:'View Order'} ,component:UserOrderViewComponent},
    {
      path:"transaction",canActivate:[],data:{title:'Transaction'},component:UserTransactionComponent
    }
  ]}
  // { path: 'view', canActivate: [], data: { title: 'View User' }, component: ViewUserComponent },
];





@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule, SharedModule,NgxDaterangepickerMd,
    RouterModule.forChild(pageRoutes),
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
    
    
  ],
  declarations: [UsersComponent,ViewUserComponent, UserOrderViewComponent, UserTransactionComponent],
  entryComponents: []
})
export class UsersModule { }


