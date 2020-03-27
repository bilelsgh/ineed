import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProposeComponent} from './propose/propose.component';
import {AuthComponent} from './auth/auth.component';
import {ProfilComponent} from './profil/profil.component';
import {AuthGuard} from './services/auth-guard.Service';
import {DemandeComponent} from './demande/demande.component';
import {FourOhFourComponent} from './four-oh-four/four-oh-four.component';
import {ContactComponent} from './contact/contact.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {AppViewComponent} from './app-view/app-view.component';


const routes : Routes = [ //Racine de toutes les routes de l'applications
  {path: 'propose', component: ProposeComponent},
  {path: 'auth', component: AuthComponent},
  {path:'profil',  canActivate:[AuthGuard], component: ProfilComponent},
  {path: 'demande', canActivate:[AuthGuard], component: DemandeComponent},
  {path:'not-found', component: FourOhFourComponent},
  {path:'contact', component: ContactComponent},
  {path:'inscription', component: InscriptionComponent},
  {path: '', component: AppViewComponent}, //indique la page "d'accueil"
  {path: '**', redirectTo:'/not-found'} //renvoie vers la page d'erreur si la route n'existe pas, à mettre à la fin

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
