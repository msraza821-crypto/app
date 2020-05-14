import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SimilarProductComponent } from './similar-product/similar-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { ColorHueModule } from 'ngx-color/hue';
import { ColorSketchModule } from 'ngx-color/sketch';


import { OnlyNumberDirective } from 'src/app/directive/only-number.directive';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ColorCompactModule } from 'ngx-color/compact';
const pageRoutes: Routes = [

  { path: '', canActivate: [],  data: { title: 'Products' },children:[{path:'',component: ProductsComponent ,data:{title:''}},
  { path: 'add', canActivate: [], data: { title: 'Add Product' }, component: AddProductComponent },{
  path: 'edit', canActivate: [], data: { title: 'Edit Product' }, component: EditProductComponent },
  { path: 'detail-product', canActivate: [], data: { title: 'Detail Product' }, component: DetailProductComponent },
  { path: 'similar-product', canActivate: [], data: { title: 'Similar Product' }, component: SimilarProductComponent }]}
];





@NgModule({
  imports: [
    NgxPaginationModule,NgxDaterangepickerMd,
    CommonModule, SharedModule,ColorHueModule, ColorSketchModule,ColorCompactModule,

    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [ProductsComponent,AddProductComponent,SimilarProductComponent,DetailProductComponent,EditProductComponent,OnlyNumberDirective],
  entryComponents: []
})
export class ProductsModule { }


