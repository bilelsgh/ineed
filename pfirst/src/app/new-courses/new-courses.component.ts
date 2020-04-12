import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, NgForm} from '@angular/forms';
import { Courses } from '../models/Courses.model';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-new-courses',
  templateUrl: './new-courses.component.html',
  styleUrls: ['./new-courses.component.css']
})
export class NewCoursesComponent implements OnInit {

  Services: ServiceService;

  liste_courses = new Array<{produit: string, quantite: string}>(); //A ENVOYER DANS LA DB
  coursesForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router,
             private httpClient : HttpClient, private auth : AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.coursesForm=this.formBuilder.group({
      user: "",
      description:"" ,
      liste:[],
      accompagne : "",
      budget : "",
      date: "",
    });}

    onSubmitForm() {
      const formValue = this.coursesForm.value;
      const newCourses = new Courses( 5, "../../assets/data/courses.png", 1,'Faire les courses',
        formValue['user'],
        formValue['description'],
        formValue['accompagne'],
        formValue['budget'],
        formValue['date'],
        this.liste_courses,
        8, //ID A RECUPERER DANS LE TOKEN LORSQU'ON PROPOSE LE SERVICE (il sera utilisé pour afficher le profil)
      );
      this.serviceService.addCourses(newCourses);
      this.router.navigate(['']);
    }

   ajouterListe(f : NgForm) {
    const new_element = {produit: '', quantite: ''};
    new_element.produit = f.value['liste_produit'];
    new_element.quantite = f.value['liste_quantite'];
    this.liste_courses.push(new_element);
    f.reset();
   }

   supprimeElem(produit:string,quantite:string){
    let compteur = 0;
    for(let elt of this.liste_courses){
      if(produit === elt.produit && quantite == elt.quantite){
        this.liste_courses.splice(compteur,1);
      }
      compteur++;
    }
   }
}

