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

const appRoutes : Routes = [ //Racine de toutes les routes de l'applications
  {path: 'propose', component: ProposeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'demande', canActivate:[AuthGuard], component: DemandeComponent},
  {path:'not-found', component: FourOhFourComponent},
  {path:'contact', component: ContactComponent},
  {path:'inscription', component: InscriptionComponent},
  {path: '', component: AppViewComponent}, //indique la page "d'accueil"
  {path: '**', redirectTo:'/not-found'} //renvoie vers la page d'erreur si la route n'existe pas, à mettre à la fin

];

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
    MyfooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [ //on ajoute ici tous les services
    AuthService,
    AuthGuard,
    InscriptionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
