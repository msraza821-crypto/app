import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../../auth/auth.guard';
import { ActivateGuard } from 'src/app/auth/activate.guard';
import { UserGuard } from 'src/app/auth/user.guard';


const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: '../pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'dashboard', loadChildren: '../pages/dashboard/dashboard.module#DashboardModule' },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
