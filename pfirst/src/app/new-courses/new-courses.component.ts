import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, NgForm} from '@angular/forms';
import { Courses } from '../models/Courses.model';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';



@Component({
  selector: 'app-new-courses',
  templateUrl: './new-courses.component.html',
  styleUrls: ['./new-courses.component.css']
})
export class NewCoursesComponent implements OnInit {

  Services: ServiceService;
  /*content= new Array<{ jour: string, accompagner: any,budget: string, liste :any,
  name: string, description: any, id: number, type: string, user: any, image : string }>();*/

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
      datejour: "",
    });}

  onSubmitForm() {

    const f = this.coursesForm;
    const content=  { datejour: '', accompagner:'',budget:'', liste: [],name:'Faire les courses', description: '',type:'service1',user:'', image: '../../assets/data/courses.png' }
    content.datejour=f.value['datejour'];
    content.accompagner= f.value['accompagne'];
    content.budget= f.value['budget'];
    content.liste=this.liste_courses;
    content.description=f.value['description'];
    content.user=f.value['user'];
    const newCourses = new Courses( JSON.parse(localStorage.getItem('token'))["user"]["idUser"], content,5,0);    
      //ID A RECUPERER DANS LE TOKEN LORSQU'ON PROPOSE LE SERVICE (il sera utilisé pour afficher le profil)
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
