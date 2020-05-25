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
  add=false;
  latitude : number=0;
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
      
      content.materiel=this.liste_materiel;

      if(this.loca==false){
        this.geolocService.getLatLong(f.value['city']+f.value['adress'])
    .catch((value)=> {console.log(value)})
    .then((e)=>{
      content.latitude=this.info.latitude;
      content.longitude=this.info.longitude;
      content.city=f.value['city'];
      const newMenage= new Menage( JSON.parse(localStorage.getItem('user'))["idUser"], content, 93,

    0,0, false);
    this.serviceService.addMenage(newMenage);
    this.router.navigate(['']);
    });

      }
      else{
        content.city=this.info.city;
        const newMenage= new Menage( JSON.parse(localStorage.getItem('user'))["idUser"], content, 93,

    0,0, false);
    

      this.serviceService.addMenage(newMenage);
      this.router.navigate(['']);

      }

      
    
    }

  

    

    getLatLng(){
      const f = this.menageForm;
      this.geolocService.getLatLong(f.value['city']+f.value['adress'])
      .catch((value)=> {console.log(value)})
      .then((e)=>{console.log(this.info);
        this.latitude=this.info.latitude;
        this.longitude=this.info.longitude;
        });
        console.log(this.latitude);
  
      }
    getLocation(){
      if(this.info.latitude==0){
      
      this.geolocService.setCurrentLocation();
      this.loca=true;
      }
      
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

