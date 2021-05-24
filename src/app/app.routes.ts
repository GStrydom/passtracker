import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamingComponent } from './gaming/gaming.component';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { GeneralComponent } from './general/general.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { EditPasswordResolver } from './edit-password/edit-password.resolver';
import { AuthguardService } from './auth/authguard.service';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent, children: [] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gaming', component: GamingComponent },
  { path: 'social', component: SocialmediaComponent },
  { path: 'general', component: GeneralComponent },
  { path: 'new-user', component: NewPasswordComponent },
  { path: 'details/:id', component: EditPasswordComponent, resolve: { data : EditPasswordResolver} }
];
