import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversComponent } from './drivers/drivers.component';


import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule, FormArray} from "@angular/forms";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ViewComponent } from './view/view.component';
import { DriverViewComponent } from './driver-view/driver-view.component';


const pageRoutes: Routes = [

  {
    path: '', canActivate: [], data: { title: 'Drivers' },
    children: [{ path: '', canActivate: [], data:{title:'Drivers'},component: DriversComponent },
    {
      path:'addDriver',canActivate:[],data:{title:'Add Driver'}, component:AddDriverComponent },
    {path:'view', canActivate:[],data:{title:'View'},component:ViewComponent},
    {path:'order-view', canActivate:[],data:{title:'View'},component:DriverViewComponent}
  ]
  
  }
];

@NgModule({
  declarations: [DriversComponent, AddDriverComponent, ViewComponent,DriverViewComponent],
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
export class DriversModule { }
