import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { EditPasswordResolver } from './components/edit-password/edit-password.resolver';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth/auth.service';

import { TransferService } from './services/transfer.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from  '@angular/fire/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import 'hammerjs';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GamingComponent } from './components/gaming/gaming.component';
import { SocialmediaComponent } from './components/socialmedia/socialmedia.component';
import { GeneralComponent } from './components/general/general.component';
import { LogoutComponent } from './components/logout/logout.component';
import { EmailComponent } from './components/email/email.component';
import { ShowpasswordComponent } from './components/showpassword/showpassword.component';
import { ImportComponent } from './components/import/import.component';
import { CategorytemplateComponent } from './components/categorytemplate/categorytemplate.component';

import { ForgotpasswordComponent } from './components/auth/forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageDialogComponent,
    EditPasswordComponent,
    NewPasswordComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GamingComponent,
    SocialmediaComponent,
    GeneralComponent,
    LogoutComponent,
    EmailComponent,
    ShowpasswordComponent,
    ImportComponent,
    CategorytemplateComponent,
    ForgotpasswordComponent,
  ],
  entryComponents: [ImageDialogComponent, ShowpasswordComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    AngularFireAuthModule,
  ],
  providers: [EditPasswordResolver, AuthService, TransferService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
