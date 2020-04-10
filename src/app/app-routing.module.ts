import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ActivateGuard } from './auth/activate.guard';
import { UserGuard } from './auth/user.guard';
import { LoginComponent } from './view/pages/login/login.component';
import { ForgotComponent } from './view/pages/forgot/forgot.component';
import { ResetComponent } from './view/pages/reset/reset.component';

const routes: Routes = [
  { path: '',component: LoginComponent },
  { path: 'login',component: LoginComponent },
  { path: 'reset-password',component: ResetComponent },
  { path: 'forgot',component: ForgotComponent },
  { path: 'theme', loadChildren: './view/theme/theme.module#ThemeModule' },
  { path: 'dashboard', loadChildren: './view/pages/dashboard/dashboard.module#DashboardModule' },
  { path: 'not-found', loadChildren: './view/pages/not-found/not-found.module#NotFoundModule' },
  { path: '**', loadChildren: './view/pages/not-found/not-found.module#NotFoundModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
