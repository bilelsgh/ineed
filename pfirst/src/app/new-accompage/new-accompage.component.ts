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
      quand1 : "",
      quand2:"",
      local : "",
      datejour: "",
      city:"",
      adress:"",
    });}

    onSubmitForm() {
    const f = this.accompagneForm;
    const content=  {id: 5, type:'service4', name:"Accompagner quelqu'un", user:'',description: '', kind:'',quand1:'',quand2 : '', local:'', datejour: '', viewNumber : 0, image: '../../assets/data/accompagner.png', contry:'France', city:'',adress:'' }
    content.datejour=f.value['datejour'];
    content.kind= f.value['kind'];
    content.quand1= f.value['quand1'];
    content.quand2= f.value['quand2'];
    content.local=f.value['local'];
    content.description=f.value['description'];
    content.user=f.value['user'];
    content.city=f.value['city'];
    content.adress=f.value['adress'];
    const newAccompage = new Accompage( JSON.parse(localStorage.getItem('user'))["idUser"], content,8,
    0, 0, false);
    this.serviceService.addAccompage(newAccompage);
    this.router.navigate(['']);
};
}
