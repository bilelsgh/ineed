import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, NgForm, Validators} from '@angular/forms';
import { Courses } from '../models/Courses.model';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { GeolocService } from '../services/geoloc.service';
import { DateService } from '../services/date.service';



@Component({
  selector: 'app-new-courses',
  templateUrl: './new-courses.component.html',
  styleUrls: ['./new-courses.component.css']
})
export class NewCoursesComponent implements OnInit {

  Services: ServiceService;
  info: any;
  adress: string;
  city: string;
  date: string;
  loca = false;
  add = false;
  map = false;
  /*content= new Array<{ jour: string, accompagner: any,budget: string, liste :any,
  name: string, description: any, id: number, type: string, user: any, image : string }>();*/

  liste_courses = new Array<{ produit: string, quantite: string }>(); //A ENVOYER DANS LA DB
  coursesForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router,
              private httpClient: HttpClient, private auth: AuthService, private geolocService: GeolocService, private dateService: DateService) {
  }

  ngOnInit(): void {
    this.info = this.geolocService.info;
    this.date = this.dateService.actu;
    this.initForm();
  }

  initForm() {
    this.coursesForm = this.formBuilder.group({
      user: ['', Validators.required],
      description: ['', Validators.required],
      liste: [[], Validators.required],
      accompagne: ['', Validators.required],
      budget: ['', Validators.required],
      datejour: ['', Validators.required],
      dateheure: ['', Validators.required],
      city: ['', Validators.required],
      adress: ['', Validators.required],
    });
  }

  onSubmitForm() {

    const f = this.coursesForm;
    const content = {
      datejour: '', dateheure: '', accompagner: '', budget: '', liste: [], name: 'Faire les courses', description: '',
      type: 'service1', user: '', viewNumber: 0, image: '../../assets/data/courses.png', contry: '', city: '', latitude: 0, longitude: 0
    }
    content.datejour = this.dateService.getDate(f);
    content.dateheure = f.value['dateheure'];
    content.accompagner = f.value['accompagne'];
    content.budget = f.value['budget'];
    content.liste = this.liste_courses;
    content.description = f.value['description'];
    content.latitude = this.info.latitude;
    content.longitude = this.info.longitude;

    content.user = f.value['user'];
    content.city = f.value['city'];
    if (this.loca == false) {
      this.geolocService.getLatLong(f.value['city'] + f.value['adress'])
        .catch((value) => {
          console.log(value)
        })
        .then((e) => {
          content.latitude = this.info.latitude;
          content.city = f.value['city'];
          content.longitude = this.info.longitude;
          const newCourses = new Courses(JSON.parse(localStorage.getItem('user'))["idUser"], content, 5, 0,
            0, false);
          this.serviceService.addCourses(newCourses);
          this.router.navigate(['']);
        });

    } else {
      content.city = this.info.city;

      const newCourses = new Courses(JSON.parse(localStorage.getItem('user'))["idUser"], content, 5, 0,
        0, false);
      this.serviceService.addCourses(newCourses);
      this.router.navigate(['']);
    }
  }


  ajouterListe(f: NgForm) {
    const new_element = {produit: '', quantite: ''};
    new_element.produit = f.value['liste_produit'];
    new_element.quantite = f.value['liste_quantite'];
    this.liste_courses.push(new_element);
    f.reset();
  }

  supprimeElem(produit: string, quantite: string) {
    let compteur = 0;
    for (let elt of this.liste_courses) {
      if (produit === elt.produit && quantite == elt.quantite) {
        this.liste_courses.splice(compteur, 1);
      }
      compteur++;
    }
  }

  getLocation() {
    if (this.info.latitude === 0) {
      this.geolocService.setCurrentLocation();
    }
    this.loca = true;
    this.map = true;
    console.log(this.info);
  }
}
