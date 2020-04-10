import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';

const pageRoutes: Routes = [

  { path: '', canActivate: [], component: UsersComponent },
];





@NgModule({
  imports: [
    
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [UsersComponent],
  entryComponents: []
})
export class UsersModule { }


