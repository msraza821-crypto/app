import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
const pageRoutes: Routes = [

  { path: '', canActivate: [],  data: { title: 'Products' },children:[{path:'',component: ProductsComponent ,data:{title:''}},
  { path: 'add', canActivate: [], data: { title: 'Add Product' }, component: AddProductComponent }]}
];





@NgModule({
  imports: [
    NgxPaginationModule,NgxDaterangepickerMd,
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [ProductsComponent,AddProductComponent],
  entryComponents: []
})
export class ProductsModule { }


