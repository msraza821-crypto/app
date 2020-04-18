import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';

import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ViewUserComponent } from './view-user/view-user.component';
const pageRoutes: Routes = [

  { path: '', 
   data: { title: 'Users' },
  children: [
    {
      path: '',
      component: UsersComponent ,data:{title:''},
    },{ path: 'view', canActivate: [], data: { title: 'View User' }, component: ViewUserComponent }
  ]}
  // { path: 'view', canActivate: [], data: { title: 'View User' }, component: ViewUserComponent },
];





@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule, SharedModule,NgxDaterangepickerMd,
    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [UsersComponent,ViewUserComponent],
  entryComponents: []
})
export class UsersModule { }


