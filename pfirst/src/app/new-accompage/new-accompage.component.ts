import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Accompage } from '../models/Accompage.model';

@Component({
  selector: 'app-new-accompage',
  templateUrl: './new-accompage.component.html',
  styleUrls: ['./new-accompage.component.css']
})
export class NewAccompageComponent implements OnInit {

  accompagneForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router,
             private httpClient : HttpClient, private auth : AuthService) { }

ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.accompagneForm=this.formBuilder.group({
      user: "",
      description:"" ,
      kind:"",
      quand : "",
      local : "",
      date: "",
    });}

    onSubmitForm() {
      const formValue = this.accompagneForm.value;
      const newAccompagne = new Accompage(103, "../../assets/data/accompage.png", 4,"Accompagner quelqu'un",
        formValue['user'],
        formValue['description'],
        formValue['kind'],
        formValue['quand'],
        formValue['local'],
        formValue['date'],
        8, //A RECUPERER DANS LE TOKEN LORS DE LA PROPOSITION DE SERVICE
      );
      this.serviceService.addAccompage(newAccompagne);
      this.router.navigate(['']);
    }
}

