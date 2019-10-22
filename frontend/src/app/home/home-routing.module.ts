import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const childRoutes = [
  {path: '', component: HomeMainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

const routes: Routes = [
  { path: '', component: HomeComponent, children: childRoutes}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
