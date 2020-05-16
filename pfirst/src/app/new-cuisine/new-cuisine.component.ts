import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Cuisine } from '../models/Cuisine.model';

@Component({
  selector: 'app-new-cuisine',
  templateUrl: './new-cuisine.component.html',
  styleUrls: ['./new-cuisine.component.css']
})
export class NewCuisineComponent implements OnInit {

  cuisineForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router,
             private httpClient : HttpClient, private auth : AuthService) { }

ngOnInit(): void {
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
      const content=  {id: 5, type:'service3', name:"Faire la cuisine", user:'',description: '', lieu:'',sur_place:'', datejour:'', dateheure : '', type_de_plat: '', viewNumber : 0,  image: '../../assets/data/cuisine.png', contry:'France', city:'', adress: '' }
      content.datejour=f.value['datejour'];
      content.lieu= f.value['lieu'];
      content.sur_place= f.value['sur_place'];
      content.type_de_plat=f.value['type_plat'];
      content.description=f.value['description'];
      content.user=f.value['user'];
      content.city=f.value['city'];
      content.adress=f.value['adress'];
    const newCuisine= new Cuisine( JSON.parse(localStorage.getItem('user'))["idUser"], content,
    0, 0, 0,false);
      this.serviceService.addCuisine(newCuisine);
      this.router.navigate(['']);
    }
}
