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
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'email', component: EmailComponent, canActivate: [AuthguardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthguardService] },
  { path: 'gaming', component: GamingComponent, canActivate: [AuthguardService] },
  { path: 'social', component: SocialmediaComponent, canActivate: [AuthguardService] },
  { path: 'general', component: GeneralComponent, canActivate: [AuthguardService] },
  { path: 'new-password', component: NewPasswordComponent, canActivate: [AuthguardService] },
  { path: 'details/:id', component: EditPasswordComponent, canActivate: [AuthguardService], resolve: { data : EditPasswordResolver} }
];
