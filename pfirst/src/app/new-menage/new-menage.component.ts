import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Menage } from '../models/Menage.model';
import { GeolocService } from '../services/geoloc.service';
import { GeolocComponent } from '../geoloc/geoloc.component';
import { Observable } from 'rxjs';

import {  DateService } from '../services/date.service';
import { AgmGeocoder } from '@agm/core';



@Component({
  selector: 'app-new-menage',
  templateUrl: './new-menage.component.html',
  styleUrls: ['./new-menage.component.css']
})
export class NewMenageComponent implements OnInit {
  info : any;
  adress:string;
  city:string;
  date:string;
  loca= false;
  latitude : number;
  longitude : number;

  liste_materiel= []; //A ENVOYER DANS LA DB
  menageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router,
             private httpClient : HttpClient, private auth : AuthService ,private geolocService:GeolocService, private dateService: DateService,private geocodeService: AgmGeocoder) { }

ngOnInit(): void {

  this.info=this.geolocService.info;
  this.date=this.dateService.actu;
  

    this.initForm();
  }

  initForm(){
    
    this.menageForm=this.formBuilder.group({
      user: ['', Validators.required],
      description:['', Validators.required],
      materiel:['', Validators.required],
      surface :['', Validators.required],
      datejour : '',
      dateheure:['', Validators.required],
      city: ['', Validators.required],
      adress: ['', Validators.required],
      salle: ['', Validators.required],
    });}

    onSubmitForm() {
      const f = this.menageForm;
      const content=  {type:'service2', name:"Faire le menage", user:'',description: '', salle:'', surface: '', datejour: '',dateheure:'', materiel:[],  image: '../../assets/data/menage.png', city:'', latitude:0, longitude:0  }
      content.datejour=this.dateService.getDate(f);
      content.dateheure=f.value['dateheure'];
      content.salle= f.value['salle'];
      content.surface=f.value['surface'];
      content.description=f.value['description'];
      
      content.latitude=this.info.latitude;
      content.longitude=this.info.longitude;
      
      content.user=f.value['user'];
      content.city=f.value['city'];
      //content.adress=f.value['adress'];
      if(this.info.longitude==0){
        this.getgetLatLong(f.value['city']+f.value['adress']).subscribe((result ) => {content.latitude=result[0].geometry.location.lat();
          content.longitude=result[0].geometry.location.lng();
        });
      }
      content.latitude=this.info.latitude;
      content.longitude=this.info.longitude;

      content.materiel=this.liste_materiel;
    const newMenage= new Menage( JSON.parse(localStorage.getItem('user'))["idUser"], content, 93,

    0,0, false);

      this.serviceService.addMenage(newMenage);
      this.router.navigate(['']);
    }

    getgetLatLong(address:string){
      return this.geocodeService.geocode({"address": address})
      /*
      const f = this.menageForm;
      this.adress=f.value['adress'];
      this.city=f.value['city'];
      if (this.city.length==0){
        this.getLocation();
      }
      else{this.geolocService.getLatLong(this.city+this.adress);}
      
      console.log(this.geolocService.info.latitude);*/
          }
    getLatLng(){
      const f = this.menageForm;
      this.getgetLatLong(f.value['city']+f.value['adress']).subscribe((result ) => {/*this.latitude=result[0].geometry.location.lat();
        this.longitude=result[0].geometry.location.lng();*/ console.log(result);
      },
      (error)=>{
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      });
      console.log(this.longitude);
    }

    

  
    getLocation(){
      if(this.info.latitude==0){
      
      this.geolocService.setCurrentLocation();
      }
      //console.log(this.info);
    }
    

    ajouterListe(f : NgForm) {
    const new_element = f.value['liste_materiel'];
    this.liste_materiel.push(new_element);
    f.reset();
   }

   supprimeElem(materiel : string){
    let compteur = 0;
    for(let elt of this.liste_materiel){
      if(materiel === elt){
        this.liste_materiel.splice(compteur,1);
      }
      compteur++;
    }
   }

  

}

