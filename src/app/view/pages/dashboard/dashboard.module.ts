import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const pageRoutes: Routes = [

  { path: '', canActivate: [], component: PageComponent },
];





@NgModule({
  imports: [
    NgbModule,
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [PageComponent],
  entryComponents: []
})
export class DashboardModule { }


