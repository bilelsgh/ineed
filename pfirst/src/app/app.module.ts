import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import {NgxImageCompressService} from 'ngx-image-compress';
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
import {NotificationService} from './services/notification.service';
import {NotifierModule} from 'angular-notifier';
import {ImageCompressorService} from "./services/image-compressor.service";
import { ActivityComponent } from './activity/activity.component';
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { ServiceActivityComponent } from './service-activity/service-activity.component';
import { ServiceProposedComponent } from './service-proposed/service-proposed.component';
import { SuiviService } from './services/suivi.service';
import { ModalAreYouSureComponent } from './modal-are-you-sure/modal-are-you-sure.component';
import { MatSnackBarComponent } from './mat-snack-bar/mat-snack-bar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReviewComponent } from './review/review.component';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ServiceReviewComponent } from './service-review/service-review.component';

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
    ActivityComponent,
    ServiceActivityComponent,
    ServiceProposedComponent,
    ModalAreYouSureComponent,
    MatSnackBarComponent,
    ReviewComponent,
    ServiceReviewComponent
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
    NotifierModule.withConfig({
      position:{
        horizontal: {
          position: 'right',
          distance: 15
        },
        vertical:{
          position: 'top',
          distance: 130,
          gap: 10
        }
      },
      behaviour:{
        autoHide: false,
        stacking: 10
      }
    }),
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
  ],
  providers: [ // on ajoute ici tous les services
    AuthService,
    AuthGuard,
    InscriptionService,
    UserService,
    ServiceService,
    NotificationService,
    NgxImageCompressService,
    ImageCompressorService,
    SuiviService,
    MatSnackBarComponent,
    Location
     // necessaire ?
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalHistoryComponent,
    ModalUserComponent
  ]
})
export class AppModule { }
