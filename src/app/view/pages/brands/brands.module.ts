import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands/brands.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { ViewBrandComponent } from './view-brand/view-brand.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
const pageRoutes: Routes = [

  {
    path: '', canActivate: [], data: { title: 'Brands' },
    children: [{ path: '', canActivate: [], data:{title:''},component: BrandsComponent },
    { path: 'add', canActivate: [], data: { title: 'Brand' }, component: AddBrandComponent },
    { path: 'view', canActivate: [], data: { title: 'View Brand' }, component: ViewBrandComponent }
  ]
  }
];





@NgModule({
  imports: [
    NgxPaginationModule, NgxDaterangepickerMd,
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),

  ],
  declarations: [BrandsComponent, AddBrandComponent,ViewBrandComponent],
  entryComponents: []
})
export class BrandsModule { }


