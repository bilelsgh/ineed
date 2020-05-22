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
import { Location } from '../models/location.model';



@Component({
  selector: 'app-new-menage',
  templateUrl: './new-menage.component.html',
  styleUrls: ['./new-menage.component.css']
})
export class NewMenageComponent implements OnInit {
  geoloc:GeolocComponent;
  info : any;
  menageForm: FormGroup;
  city: string;
  adress: string;
  latitude:number;
  longitude: number;
  loading: boolean;
  

  loca= false;

  liste_materiel= []; //A ENVOYER DANS LA DB

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router,
             private httpClient : HttpClient, private auth : AuthService ,private geolocService:GeolocService) { }

ngOnInit(): void {

  this.info=this.geolocService.info;


    this.initForm();
  }

  initForm(){
    
    this.menageForm=this.formBuilder.group({
      user: ['', Validators.required],
      description:['', Validators.required],
      materiel:['', Validators.required],
      surface :['', Validators.required],
      datejour : ['', Validators.required],
      dateheure:['', Validators.required],
      city: ['', Validators.required],
      adress: ['', Validators.required],
      salle: ['', Validators.required],
    });}

    onSubmitForm() {
      const f = this.menageForm;
      const content=  {type:'service2', name:"Faire le menage", user:'',description: '', salle:'', surface: '', datejour: '',dateheure:'', materiel:[],  image: '../../assets/data/menage.png',contry:'France', city:'', adress: '', latitude:0, longitude:0  }
      content.datejour=f.value['datejour'];
      content.dateheure=f.value['dateheure'];
      content.salle= f.value['salle'];
      content.surface=f.value['surface'];
      content.description=f.value['description'];
      
      content.latitude=this.info.latitude;
      content.longitude=this.info.longitude;
      
      content.user=f.value['user'];
      content.city=f.value['city'];
      content.adress=f.value['adress'];
      /*if(this.info.longitude==0){
        this.geolocService.getLatLong(content.adress+content.city);
        content.latitude=this.info.latitude;
        content.longitude=this.info.longitude;
        console.log(this.info)
      }*/
      content.materiel=this.liste_materiel;
    const newMenage= new Menage( JSON.parse(localStorage.getItem('user'))["idUser"], content, 93,

    0,0, false);

      this.serviceService.addMenage(newMenage);
      this.router.navigate(['']);
    }

    getgetLatLong(){
      const f = this.menageForm;
      this.adress=f.value['adress'];
      this.city=f.value['city'];
      this.geolocService.getLatLong(this.city+this.adress);

    }

  
    getLocation(){
      if(this.info.latitude==0){
      
      this.geolocService.setCurrentLocation();
      }
      console.log(this.info);
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

