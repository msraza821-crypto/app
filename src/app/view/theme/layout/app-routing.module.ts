import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
export var adminLteConf = {
  skin: 'blue',
  sidebarLeftMenu: [
    {label: 'Start', route: '/', iconClasses: 'fa fa-th'}
  ]
};
const routes: Routes = [];
import { LayoutModule } from 'angular-admin-lte';   //Import the layout module.
@NgModule({
  imports: [LayoutModule.forRoot(adminLteConf)],
  exports: [LayoutModule]
})
export class AppRoutingModule { }
