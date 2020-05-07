import { Courses } from '../models/Courses.model';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import { Menage } from '../models/Menage.model';
import { Cuisine } from '../models/Cuisine.model';
import { Accompage } from '../models/Accompage.model';

@Injectable()
export class ServiceService{

  current_service: any;
  private courses:Courses[]= [];
  private menage:Menage[] =[];
  private cuisine:Cuisine[] = [];
  private accompage: Accompage []=[];
  coursesSubject = new Subject<Courses[]>();
  menageSubject = new Subject<Menage[]>();
  cuisineSubject = new Subject<Cuisine[]>();
  accompageSubject = new Subject<Accompage[]>();

  addCuisine(cuisine : Cuisine){
    cuisine.id=this.services[(this.services.length - 1)].id + 1
    this.services.push(cuisine);
    this.emitCuisine();
    let cuisine_back = {idUser: cuisine["idUser"], content: JSON.stringify(cuisine["content"]), id: cuisine["id"],
      price: cuisine['price']} //On convertit en string car c'est le format attendu dans le BACK

    //Création de l'objet contenant l'annonce et le token pour l'envoyer au BACK
    let message = {"token" : JSON.parse(localStorage.getItem('token')), "announce" : cuisine_back};
    console.table(message);

    this.httpClient
      .post(this.auth.backend+"api/announce", message)
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token
          console.log("#DEBUG : Envoie de cuisine vers le BACK réussi");
          console.table(response);
        },
        (error) => {
          if(error['status'] === 401){
            this.auth.removeUserInfo();
            console.log("#TOKEN EXPIRED");
          }
          console.log("#DEBUG : Erreur lors de l'envoie de cuisine vers le BACK : "+ error);
        }
      );
  }

  emitAccompage(){
    this.accompageSubject.next(this.accompage.slice());
  }


  addAccompage(accompagne : Accompage){
    accompagne.id=this.services[(this.services.length - 1)].id + 1
    this.services.push(accompagne);
    this.emitAccompage();
    let accompagne_back = {idUser: accompagne["idUser"], content: JSON.stringify(accompagne["content"]), id: accompagne["id"],
      price: accompagne['price']} //On convertit en string car c'est le format attendu dans le BACK

    //Création de l'objet contenant l'annonce et le token pour l'envoyer au BACK
    let message = {"token" : JSON.parse(localStorage.getItem('token')), "announce" : accompagne_back};
    console.table(message);

    this.httpClient
      .post(this.auth.backend+"api/announce", message)
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token
          console.log("#DEBUG : Envoie de accompagne vers le BACK réussi");
          console.table(response);
        },
        (error) => {
          if(error['status'] === 401){
            this.auth.removeUserInfo();
            console.log("#TOKEN EXPIRED");
          }
          console.log("#DEBUG : Erreur lors de l'envoie de accompagne vers le BACK : "+ error);
        }
      );
  }

  emitCuisine(){
    this.cuisineSubject.next(this.cuisine.slice());
  }

  emitCourses(){
    this.coursesSubject.next(this.courses.slice());
  }

  //VERSION POUR ENVOYER DANS LE BACK
  addCourses(courses : Courses){
    courses.content['id']=this.services[(this.services.length - 1)].id + 1
    this.services.push(courses);
    this.emitCourses();
    let course_back = {idUser: courses["idUser"], content: JSON.stringify(courses["content"]), id: courses["id"],
    price: courses['price']} //On convertit en string car c'est le format attendu dans le BACK

    //Création de l'objet contenant l'annonce et le token pour l'envoyer au BACK
    let message = {"token" : JSON.parse(localStorage.getItem('token')), "announce" : course_back};
    console.table(message);

    this.httpClient
      .post(this.auth.backend+"api/announce", message)
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token
          console.log("#DEBUG : Envoie des courses vers le BACK réussi");
          console.table(response);
        },
        (error) => {
          if(error['status'] === 401){
            this.auth.removeUserInfo();
            console.log("#TOKEN EXPIRED");
          }
          console.log("#DEBUG : Erreur lors de l'envoie des courses vers le BACK: "+ error);
        }
      );
  }

  emitMenage(){
    this.menageSubject.next(this.menage.slice());
  };

  addMenage(menage : Menage){
    menage.id=this.services[(this.services.length - 1)].id + 1
    this.services.push(menage);
    this.emitMenage();
    let menage_back = {idUser: menage["idUser"], content: JSON.stringify(menage["content"]), id: menage["id"],
      price: menage['price']} //On convertit en string car c'est le format attendu dans le BACK

    //Création de l'objet contenant l'annonce et le token pour l'envoyer au BACK
    let message = {"token" : JSON.parse(localStorage.getItem('token')), "announce" : menage_back};
    console.table(message);

    this.httpClient
      .post(this.auth.backend+"api/announce", message)
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token
          console.log("#DEBUG : Envoie de ménage vers le BACK réussi");
          console.table(response);
        },
        (error) => {
          if(error['status'] === 401){
            this.auth.removeUserInfo();
            console.log("#TOKEN EXPIRED");
          }
          console.log("#DEBUG : Erreur lors de l'envoie de ménage vers le BACK : "+ error);
        }
      );
  }

  services : any[] = [

    {idUser: 999,
    content:{


      image:"../assets/data/cuisine_pour_annonce_courte.jpg",
      type:'service1',
      name: 'Faire les courses',
      user: 'Jean Paul Gauthier',
      description: "J'ai faim la vie de maman",
      liste: [],
      accompagner:"",
      budget: "98",
      datejour:"30/03/2002"},
      id: 1,
      price : 0,


    }
  ];

  constructor(private httpClient : HttpClient, private auth : AuthService){
  }

  getServiceById(id: number) {
    console.log("#ID : " + id);
    return new Promise((resolve,reject)=> {
      this.httpClient
        .get(this.auth.backend+'announce/' + id + '?token=' + JSON.parse(localStorage.getItem('token')))
        .subscribe(
          (response) => {
            this.current_service = response["announce"];
            this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token

            console.log("#Récupération de current_service (getById) OK");
            console.table("#SERVICE-SERVICE : current_service :", this.current_service);
            resolve(true);
          },
          (error) => {
            if(error['status'] === 401){
              this.auth.removeUserInfo();
              console.log("#TOKEN EXPIRED");
            }
            console.log("Erreur de chargement : " + error);
            reject(true);
          }
        );
    });
  }
}
