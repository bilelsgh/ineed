import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Cuisine } from '../models/Cuisine.model';
import { GeolocComponent } from '../geoloc/geoloc.component';
import { GeolocService } from '../services/geoloc.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-new-cuisine',
  templateUrl: './new-cuisine.component.html',
  styleUrls: ['./new-cuisine.component.css']
})
export class NewCuisineComponent implements OnInit {
  info : any;
  cuisineForm: FormGroup;
  adress:string;
  city:string;
  date:string;
  loca= false;
  add=false;
  map=false;

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router,
             private httpClient : HttpClient, private auth : AuthService, private geolocService: GeolocService, private dateService: DateService) { }

ngOnInit(): void {
  this.info=this.geolocService.info;
  this.date=this.dateService.actu;
    this.initForm();
  }

  initForm(){
    this.cuisineForm=this.formBuilder.group({
      user: "",
      description:"" ,
      sur_place:"",
      type_plat : "",
      lieu : "",
      datejour: "",
      dateheure:'',
      city:'',
      adress:'',
    });}

    onSubmitForm() {


      const f = this.cuisineForm;
      const content=  {id: 5, type:'service3', name:"Faire la cuisine", user:'',description: '', lieu:'',sur_place:'', datejour:'',
        dateheure : '', type_de_plat: '', viewNumber : 0,  image: '../../assets/data/cuisine.png', contry:'France', city:'', latitude:0, longitude:0 }

      content.datejour=f.value['datejour'];
      content.lieu= f.value['lieu'];
      content.sur_place= f.value['sur_place'];
      content.type_de_plat=f.value['type_plat'];
      content.description=f.value['description'];
      content.latitude=this.info.latitude;
      content.longitude=this.info.longitude;

      content.user=f.value['user'];


      if(this.loca==false){
        this.geolocService.getLatLong(f.value['city']+f.value['adress'])
    .catch((value)=> {console.log(value)})
    .then((e)=>{
      content.latitude=this.info.latitude;
      content.longitude=this.info.longitude;
      content.city=f.value['city'];
      const newCuisine= new Cuisine( JSON.parse(localStorage.getItem('user'))["idUser"], content,
    0, 0, 0,false);
      this.serviceService.addCuisine(newCuisine);
      this.router.navigate(['']);
    });

      }
      else{
        content.city=this.info.city;
    const newCuisine= new Cuisine( JSON.parse(localStorage.getItem('user'))["idUser"], content,
    0, 0, 0,false);
      this.serviceService.addCuisine(newCuisine);
      this.router.navigate(['']);
    }
  }



    getLocation(){
      if(this.info.latitude==0){

      this.geolocService.setCurrentLocation();
      this.loca=true;
      this.map=true;
      }
      console.log(this.info);
    }

}
