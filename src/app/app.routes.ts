import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GamingComponent } from './components/gaming/gaming.component';
import { EmailComponent } from './components/email/email.component';
import { SocialmediaComponent } from './components/socialmedia/socialmedia.component';
import { GeneralComponent } from './components/general/general.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { EditPasswordResolver } from './components/edit-password/edit-password.resolver';
import { AuthguardService } from './services/auth/authguard.service';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'profile', component: HomeComponent, canActivate: [AuthguardService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'email', component: EmailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gaming', component: GamingComponent },
  { path: 'social', component: SocialmediaComponent },
  { path: 'general', component: GeneralComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'details/:id', component: EditPasswordComponent, resolve: { data : EditPasswordResolver} }
];
