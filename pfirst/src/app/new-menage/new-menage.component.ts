import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Menage } from '../models/Menage.model';

@Component({
  selector: 'app-new-menage',
  templateUrl: './new-menage.component.html',
  styleUrls: ['./new-menage.component.css']
})
export class NewMenageComponent implements OnInit {
  menageForm: FormGroup;

  liste_materiel= []; //A ENVOYER DANS LA DB

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router,
             private httpClient : HttpClient, private auth : AuthService) { }

ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.menageForm=this.formBuilder.group({
      user: ['', Validators.required],
      description:['', Validators.required],
      materiel:['', Validators.required],
      surface :['', Validators.required],
      date : ['', Validators.required],
      heure:['', Validators.required],
      localisation: ['', Validators.required],
    });}

    onSubmitForm() {
      const formValue = this.menageForm.value;
      const newMenage = new Menage(93, "../../assets/data/menage.png", "service2",'Faire le menage',
        formValue['user'],
        formValue['description'],
        formValue['salle'],
        formValue['localisation'],
        formValue['surface'],
        formValue['date'],
        formValue['heure'],
        this.liste_materiel,
      );
      this.serviceService.addMenage(newMenage);
      this.router.navigate(['/profil']);
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


