import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Accompage } from '../models/Accompage.model';
import { GeolocService } from '../services/geoloc.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-new-accompage',
  templateUrl: './new-accompage.component.html',
  styleUrls: ['./new-accompage.component.css']
})
export class NewAccompageComponent implements OnInit {

  accompagneForm: FormGroup;
  info : any;
  adress:string;
  city:string;
  date:string;
  loca= false;
  add=false;
  map=false;

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router,
             private httpClient : HttpClient, private auth : AuthService, private geolocService:GeolocService, private dateService: DateService) { }
ngOnInit(): void {
    this.initForm();
    this.info=this.geolocService.info;
  this.date=this.dateService.actu;
  this.loca=false;
  }

  initForm(){
    this.accompagneForm=this.formBuilder.group({
      description:['', Validators.required],
      kind:['', Validators.required],
      quand1 :['', Validators.required],
      quand2:['', Validators.required],
      datejour: ['', Validators.required],
      city:"",
      adress:"",
    });
  }

    onSubmitForm() {
    const f = this.accompagneForm;
    const content=  {id: 5, type:'service4', name:"Accompagner quelqu'un", user:'',description: '', kind:'',quand1:'',quand2 : '',
      local:'', datejour: '', viewNumber : 0, image: '../../assets/data/accompagner.png', rejected: [], city:'',latitude:0, longitude:0 }
    content.datejour=this.dateService.getDate(f);

    content.kind= f.value['kind'];
    content.quand1= f.value['quand1'];
    content.quand2= f.value['quand2'];
    content.local=f.value['local'];
    content.description=f.value['description'];
    content.user=JSON.parse(localStorage.getItem("user"))['firstName'];
    content.latitude=this.info.latitude;
    content.longitude=this.info.longitude;


    if(this.loca==false){
      this.geolocService.getLatLong(f.value['city']+f.value['adress'])
  .catch((value)=> {console.log(value)})
  .then((e)=>{
    content.latitude=this.info.latitude;
    content.longitude=this.info.longitude;
    content.city=f.value['city'];
    const newAccompage = new Accompage( JSON.parse(localStorage.getItem('user'))["idUser"], content,8,
    0, 0, 0);
    this.serviceService.addAccompage(newAccompage);
    this.router.navigate(['']);
  }
  );}
  else{
    content.city=this.info.city;
    const newAccompage = new Accompage( JSON.parse(localStorage.getItem('user'))["idUser"], content,8,
    0, 0, 0);
    this.serviceService.addAccompage(newAccompage);
    this.router.navigate(['']);
  }
};





getLocation(){
  if(this.info.latitude==0){

  this.geolocService.setCurrentLocation();
  }
  console.log(this.info);
  this.loca=true;
  this.map=true;
}
}
