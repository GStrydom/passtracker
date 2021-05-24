import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { EditPasswordResolver } from './edit-password/edit-password.resolver';
import { NewPasswordComponent } from './new-password/new-password.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuthModule } from  "@angular/fire/auth";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GamingComponent } from './gaming/gaming.component';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { GeneralComponent } from './general/general.component';
import { LogoutComponent } from './logout/logout.component';


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
    
  ],
  entryComponents: [ImageDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
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
  providers: [FirebaseService, EditPasswordResolver, AuthService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
