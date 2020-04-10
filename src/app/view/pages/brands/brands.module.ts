import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands/brands.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { SharedModule } from '../shared/shared.module';

const pageRoutes: Routes = [

  { path: '', canActivate: [], component: BrandsComponent },
  { path: 'add', canActivate: [], component: AddBrandComponent },
];





@NgModule({
  imports: [
    
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [BrandsComponent,AddBrandComponent],
  entryComponents: []
})
export class BrandsModule { }


