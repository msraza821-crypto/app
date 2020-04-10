import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const pageRoutes: Routes = [

  { path: '', component: NotFoundComponent }

];

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(pageRoutes),
    

  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
