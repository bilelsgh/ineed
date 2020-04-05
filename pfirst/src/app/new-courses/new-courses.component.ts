import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, NgForm} from '@angular/forms';
import { Courses } from '../models/Courses.model';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-courses',
  templateUrl: './new-courses.component.html',
  styleUrls: ['./new-courses.component.css']
})
export class NewCoursesComponent implements OnInit {

  liste_courses = new Array<{produit: string, quantite: string}>(); //A ENVOYER DANS LA DB
  coursesForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.coursesForm=this.formBuilder.group({
      user: "",
      description:"" ,
      liste:[],
      accompagne : "",
      budget : 32,
      dispo: "",
    });}

    onSubmitForm() {
      const formValue = this.coursesForm.value;
      const newCourses = new Courses(98, "../../assets/data/menage.png", "service1",'Faire les courses',
        formValue['user'],
        formValue['description'],
        formValue['accompagne'],
        formValue['budget'],
        formValue['dispo'],
        this.liste_courses,
      );
      this.serviceService.addCourses(newCourses);
      this.router.navigate(['/profil']);
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

