import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { ChildcategoriesComponent } from './childcategories/childcategories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { AddChildcategoryComponent } from './add-childcategory/add-childcategory.component';
import { SharedModule } from '../shared/shared.module';

import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
const pageRoutes: Routes = [

  { path: '', canActivate: [],data:{title:'Categories'},
  children:[{path: '', canActivate: [],data:{title:''}, component: CategoriesComponent },
  { path: 'add', canActivate: [], data:{title:'Add Category'}, component: AddCategoryComponent },
  { path: 'subcategories', canActivate: [], data:{title:'Sub-categories'},children:[{ component: SubcategoriesComponent ,path: '', canActivate: [], data:{title:'Sub-categories'}},
  { path: 'add-subcategory', canActivate: [],data:{title:'Add Sub-category'}, component: AddSubcategoryComponent },
  { path: 'childcategories', canActivate: [],data:{title:'Child-categories'}, component: ChildcategoriesComponent }, { path: 'add-childcategory', canActivate: [],data:{title:'Add Child-category'}, component: AddChildcategoryComponent }]},  
 
  ]}
];
@NgModule({
  imports: [
    NgxPaginationModule,NgxDaterangepickerMd,
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [CategoriesComponent,AddCategoryComponent,SubcategoriesComponent,ChildcategoriesComponent,AddSubcategoryComponent,AddChildcategoryComponent],
  entryComponents: []
})
export class CategoriesModule { }


