import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ActivateGuard } from 'src/app/auth/activate.guard';


const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    data: {
      title: 'Dashboard'
    },
    children: [
      { path: '',canLoad:[ActivateGuard], loadChildren: '../pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'Dashbaord',canLoad:[ActivateGuard], loadChildren: '../pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'settings',canLoad:[ActivateGuard],  loadChildren: '../pages/settings/settings.module#SettingsModule' },
      { path: 'users',canLoad:[ActivateGuard], loadChildren: '../pages/users/users.module#UsersModule' },
      { path: 'brands',canLoad:[ActivateGuard], loadChildren: '../pages/brands/brands.module#BrandsModule' },
      { path: 'categories',canLoad:[ActivateGuard],  loadChildren: '../pages/categories/categories.module#CategoriesModule' },
      { path: 'cms',canLoad:[ActivateGuard], loadChildren: '../pages/cms/cms.module#CmsModule' },
      { path: 'faqs',canLoad:[ActivateGuard],loadChildren: '../pages/faqs/faqs.module#FaqsModule' },
      { path: 'contactus',canLoad:[ActivateGuard],  loadChildren: '../pages/contactus/contactus.module#ContactusModule' },
      { path: 'products',canLoad:[ActivateGuard], loadChildren: '../pages/products/products.module#ProductsModule' },


    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
