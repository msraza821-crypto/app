import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { SharedModule } from '../shared/shared.module';

const pageRoutes: Routes = [

  { path: '',  data: { title: '' },canActivate: [], component: PageComponent },
];





@NgModule({
  imports: [
    
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [PageComponent],
  entryComponents: []
})
export class DashboardModule { }


