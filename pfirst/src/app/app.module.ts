import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{AgmCoreModule} from '@agm/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppViewComponent } from './app-view/app-view.component';
import { DemandeComponent } from './demande/demande.component';
import { ServiceViewComponent } from './propose/propose.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import {AuthGuard} from './services/auth-guard.Service';
import { InscriptionComponent } from './inscription/inscription.component';
import {FormsModule, Validators} from '@angular/forms';
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
import {UserService} from './services/users.service';
import { GlobalNavbarComponent } from './global-navbar/global-navbar.component';
import { ServiceComponent } from './service/service.component';
import { SingleServiceComponent } from './single-service/single-service.component';
import { MenageSingleComponent } from './menage-single/menage-single.component';
import { CoursesSingleComponent } from './courses-single/courses-single.component';
import { CuisineSingleComponent } from './cuisine-single/cuisine-single.component';
import { AccompagnerSingleComponent } from './accompagner-single/accompagner-single.component';
import { ServiceService } from './services/service.service';
import { NewCoursesComponent } from './new-courses/new-courses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ModalHistoryComponent } from './modal-history/modal-history.component';
import {ModalUserComponent} from './modal-user/modal-user.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NewMenageComponent } from './new-menage/new-menage.component';
import { NewCuisineComponent } from './new-cuisine/new-cuisine.component';
import { NewAccompageComponent } from './new-accompage/new-accompage.component';
import { InfoSettingsComponent } from './info-settings/info-settings.component';
import { DisplayProfilComponent } from './display-profil/display-profil.component';
import { FiltreProposeComponent } from './filtre-propose/filtre-propose.component';
import { GeolocComponent } from './geoloc/geoloc.component';
import { GeolocService } from './services/geoloc.service';

@NgModule({
  declarations: [
    AppComponent,
    AppViewComponent,
    DemandeComponent,
    ServiceViewComponent,
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
    GlobalNavbarComponent,
    ServiceComponent,
    SingleServiceComponent,
    MenageSingleComponent,
    CoursesSingleComponent,
    CuisineSingleComponent,
    AccompagnerSingleComponent,
    NewCoursesComponent,
    ModalHistoryComponent,
    ModalUserComponent,
    NewMenageComponent,
    NewCuisineComponent,
    NewAccompageComponent,
    InfoSettingsComponent,
    DisplayProfilComponent,
    FiltreProposeComponent,
    GeolocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    NgbModule,
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBIh9TYl-xIbSabypO5hkQyNcZjRWSd0VI'}),
  ],
  providers: [ // on ajoute ici tous les services
    AuthService,
    AuthGuard,
    InscriptionService,
    UserService,
    ServiceService,
    Location,
    GeolocService,
     // necessaire ?
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalHistoryComponent,
    ModalUserComponent
  ]
})
export class AppModule { }
