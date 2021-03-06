import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners/banners.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule, FormArray} from "@angular/forms";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ViewComponent } from './view/view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddBannersComponent } from './add-banners/add-banners.component'; 



const pageRoutes: Routes = [

  {
    path: '', canActivate: [], data: { title: 'Banners' },
    children: [{ path: '', canActivate: [], data:{title:'Banners'},component: BannersComponent },
    { path: 'view', canActivate: [], data:{title:'View'},component: ViewComponent },
    {
      path:'add',canActivate:[],data:{title:'Banner'},component:AddBannersComponent    }
           
  
  ]
  }
];

@NgModule({
  declarations: [BannersComponent, ViewComponent, AddBannersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(pageRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDaterangepickerMd,
    NgxPaginationModule
  ]
})
export class SimplebannersModule { }
