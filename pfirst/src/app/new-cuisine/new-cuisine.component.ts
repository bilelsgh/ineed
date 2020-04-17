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
      date: "",
    });}

    onSubmitForm() {
      const formValue = this.cuisineForm.value;
      const newCuisine = new Cuisine(101, "../../assets/data/cuisine.png", 'service3','Faire la cuisine',
        formValue['user'],
        formValue['description'],
        formValue['lieu'],
        formValue['sur_place'],
        formValue['date'],
        formValue['type_plat'],
        JSON.parse(localStorage.getItem('token'))["user"]['idUser'], //ID A RECUPERER DANS LE TOKEN LORSQU'ON PROPOSE LE SERVICE (il sera utilisé pour afficher le profil)
      );
      this.serviceService.addCuisine(newCuisine);
      this.router.navigate(['']);
    }
}
