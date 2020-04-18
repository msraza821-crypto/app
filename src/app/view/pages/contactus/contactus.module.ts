import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactusComponent } from './contactus/contactus.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
const pageRoutes: Routes = [

  { path: '', canActivate: [], component: ContactusComponent }
];





@NgModule({
  imports: [
    NgxPaginationModule,NgxDaterangepickerMd,
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [ContactusComponent],
  entryComponents: []
})
export class ContactusModule { }


