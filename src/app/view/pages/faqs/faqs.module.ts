import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FaqsComponent } from './faqs/faqs.component';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
const pageRoutes: Routes = [

  { path: '', canActivate: [], data: { title: 'FAQS' },children:[{path: '',component: FaqsComponent ,data:{title:''}},
  { path: 'add', canActivate: [], data: { title: 'Add FAQ' }, component: AddFaqComponent }]}
];





@NgModule({
  imports: [
    NgxPaginationModule,NgxDaterangepickerMd,
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [FaqsComponent,AddFaqComponent],
  entryComponents: []
})
export class FaqsModule { }


