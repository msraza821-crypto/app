import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';

const pageRoutes: Routes = [

  { path: '', component: NotFoundComponent }

];

@NgModule({
  imports: [
    
    CommonModule,
    RouterModule.forChild(pageRoutes),
    

  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
