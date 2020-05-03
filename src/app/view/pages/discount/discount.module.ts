import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount/discount.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { DetailDiscountComponent } from './detail-discount/detail-discount.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { ColorHueModule } from 'ngx-color/hue';
import { OnlyNumberDirective } from 'src/app/directive/only-number.directive';

const pageRoutes: Routes = [

  { path: '', canActivate: [],  data: { title: 'Products' },children:[{path:'',component: DiscountComponent ,data:{title:''}},
  { path: 'add', canActivate: [], data: { title: 'Add Product' }, component: AddDiscountComponent },
  { path: 'detail-discount', canActivate: [], data: { title: 'Detail Product' }, component: DetailDiscountComponent }]}
];





@NgModule({
  imports: [
    NgxPaginationModule,NgxDaterangepickerMd,
    CommonModule, SharedModule,ColorHueModule,
    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [DiscountComponent,AddDiscountComponent,DetailDiscountComponent,OnlyNumberDirective],
  entryComponents: []
})
export class DiscountModule { }


