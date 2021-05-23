import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamingComponent } from './gaming/gaming.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { EditPasswordResolver } from './edit-password/edit-password.resolver';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gaming', component: GamingComponent },
  { path: 'new-user', component: NewPasswordComponent },
  { path: 'details/:id', component: EditPasswordComponent, resolve:{ data : EditPasswordResolver} }
];
