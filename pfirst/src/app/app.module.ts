import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppViewComponent } from './app-view/app-view.component';
import { DemandeComponent } from './demande/demande.component';
import { ProposeComponent } from './propose/propose.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import {AuthGuard} from './services/auth-guard.Service';
import { InscriptionComponent } from './inscription/inscription.component';
import {FormsModule} from '@angular/forms';
import {InscriptionService} from './services/inscription.service';
import { MembersComponent } from './members/members.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { AnnonceCourteComponent } from './annonce-courte/annonce-courte.component';
import { FooterComponent } from './footer/footer.component';
import { MyfooterComponent } from './myfooter/myfooter.component';
import { FormerServiceComponent } from './former-service/former-service.component';
import { NiveauComponent } from './niveau/niveau.component';
import { ProfilComponent } from './profil/profil.component';
import { ServicesExperienceComponent } from './services-experience/services-experience.component';
import {UserService} from "./services/users.service";
import { GlobalNavbarComponent } from './global-navbar/global-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    AppViewComponent,
    DemandeComponent,
    ProposeComponent,
    AuthComponent,
    FourOhFourComponent,
    InscriptionComponent,
    MembersComponent,
    ContactComponent,
    AnnonceCourteComponent,
    FooterComponent,
    MyfooterComponent,
    FormerServiceComponent,
    NiveauComponent,
    ProfilComponent,
    ServicesExperienceComponent,
    GlobalNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ //on ajoute ici tous les services
    AuthService,
    AuthGuard,
    InscriptionService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
