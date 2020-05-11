import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners/banners.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule} from "@angular/forms";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewBannerComponent } from './view-banner/view-banner.component';
import { AddBannerComponent } from './add-banner/add-banner.component'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
const pageRoutes: Routes = [

  {
    path: '', canActivate: [], data: { title: 'Promotional Banners' },
    children: [{ path: '', canActivate: [], data:{title:''},component: BannersComponent },
              {path:'view',canActivate:[],data:{title:'View'}, component:ViewBannerComponent},
              {path:'add', canActivate:[],data:{title:'Banner'},component:AddBannerComponent}
  
  ]
  }
];

@NgModule({
  declarations: [BannersComponent, ViewBannerComponent, AddBannerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(pageRoutes),NgMultiSelectDropDownModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxDaterangepickerMd,
    NgbModule


  
  
 
  ]
})
export class BannersModule { }
