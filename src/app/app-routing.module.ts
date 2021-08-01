import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './login/auth/auth.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CreateItemComponent } from './login/create-item/create-item.component';
import { EditItemComponent } from './login/edit-item/edit-item.component';
import { AuthGuard } from './login/auth/auth.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'login', component: LoginComponent, children: [
      { path: 'login', redirectTo: '/login/auth', pathMatch: 'full'},
      { path: 'auth', component: AuthComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}, 
      { path: 'edit/:id', component: EditItemComponent, canActivate: [AuthGuard]},
      { path: 'create', component: CreateItemComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
