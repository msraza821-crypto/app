import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners/banners.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule} from "@angular/forms";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPaginationModule } from 'ngx-pagination';

import { ViewBannerComponent } from './view-banner/view-banner.component';
import { AddBannerComponent } from './add-banner/add-banner.component'; // <-- import the module




import {CdkTableModule} from '@angular/cdk/table';

import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {MatCheckboxModule} from '@angular/material/checkbox';


import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

import {MatSelectModule} from '@angular/material/select';



const pageRoutes: Routes = [

  {
    path: '', canActivate: [], data: { title: 'Banners' },
    children: [{ path: '', canActivate: [], data:{title:''},component: BannersComponent },
              {path:'view',canActivate:[],data:{title:'View'}, component:ViewBannerComponent},
              {path:'add', canActivate:[],data:{title:'Add Banner'},component:AddBannerComponent}
  
  ]
  }
];

@NgModule({
  declarations: [BannersComponent, ViewBannerComponent, AddBannerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(pageRoutes),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxDaterangepickerMd,


  
    CdkTableModule,
   
    MatAutocompleteModule,
  
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
   
    MatCheckboxModule,
 
  
    MatInputModule,
    MatListModule,
  
   
    MatSelectModule,
  
 
  ]
})
export class BannersModule { }
