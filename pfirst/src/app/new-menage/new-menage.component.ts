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
      datejour : ['', Validators.required],
      heure:['', Validators.required],
      localisation: ['', Validators.required],
    });}

    onSubmitForm() {
      const f = this.menageForm;
      const content=  { type:'service2', name:"Faire le menage", user:'',description: '', salle:'',localisation:'',
        surface: '', datejour: '',dateheure:'', materiel:[], viewNumber: 0,  image: '../../assets/data/menage.png' }
      content.datejour=f.value['datejour'];
      content.datejour=f.value['dateheure'];
      content.salle= f.value['salle'];
      content.localisation= f.value['localisation'];
      content.surface=f.value['surface'];
      content.description=f.value['description'];

      content.user=f.value['user'];
      content.materiel=this.liste_materiel
    const newMenage= new Menage( JSON.parse(localStorage.getItem('user'))["idUser"], content, 93,
    0, 0,[0],false); //assignees ne contient pas encore de helpers et le service n'est pas en cours




      this.serviceService.addMenage(newMenage);
      this.router.navigate(['']);
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


