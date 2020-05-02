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
    this.httpClient
      .put(this.auth.backend_test +"services.json", this.services)
      .subscribe( //
        () => { //
          console.log("Enregistrement ok!");
        },
        (error) => {
          if(error['status'] === 401){
            this.auth.removeUserInfo();
            console.log("#TOKEN EXPIRED");
          }
          console.log("Erreur : "+ error);
        }
      );
  }

  emitAccompage(){
    this.accompageSubject.next(this.accompage.slice());
  }


  addAccompage(accompage : Accompage){
    accompage.id=this.services[(this.services.length - 1)].id + 1
    this.services.push(accompage);
    this.emitCuisine();
    this.httpClient
      .put(this.auth.backend_test +"services.json", this.services)
      .subscribe( //
        () => { //
          console.log("Enregistrement ok!");
        },
        (error) => {
          if(error['status'] === 401){
            this.auth.removeUserInfo();
            console.log("#TOKEN EXPIRED");
          }
          console.log("Erreur : "+ error);
        }
      );
  }

  emitCuisine(){
    this.cuisineSubject.next(this.cuisine.slice());
  }

  emitCourses(){
    this.coursesSubject.next(this.courses.slice());
  }

  //VERSION POUR ENVOYER DANS FIREBASE
  /*addCourses(courses : Courses){
    courses.id=this.services[(this.services.length - 1)].id + 1
    this.services.push(courses);
    this.emitCourses();

    this.httpClient
      .put(this.auth.backend_test+"services.json", this.services)
      .subscribe(
        () => {
          console.log("Enregistrement ok!");
        },
        (error) => {
          console.log("Erreur : "+ error);
        }
      );
  }*/

  //VERSION POUR ENVOYER DANS LE BACK
  addCourses(courses : Courses){
    courses.content['id']=this.services[(this.services.length - 1)].id + 1
    this.services.push(courses);
    this.emitCourses();
    let course_back = {idUser: courses["idUser"], content: JSON.stringify(courses["content"]), id: courses["id"],
    price: courses['price']} //On convertit en string car c'est le format attendu dans le BACK

    //Création de l'objet contenant l'annonce et le token pour l'envoyer au BACK
    let message = {"token" : JSON.parse(localStorage.getItem('token'))['token'], "announce" : course_back};
    console.table(message);

    this.httpClient
      .post(this.auth.backend+"api/announce", message)
      .subscribe(
        (response) => {
          console.log("#DEBUG : Envoie des courses réussi");
          console.table(response);
        },
        (error) => {
          if(error['status'] === 401){
            this.auth.removeUserInfo();
            console.log("#TOKEN EXPIRED");
          }
          console.log("#DEBUG : Erreur lors de l'envoie des courses: "+ error);
        }
      );
  }

  emitMenage(){
    this.menageSubject.next(this.menage.slice());
  };

  addMenage(menage : Menage){
    menage.id=this.services[(this.services.length - 1)].id + 1
    this.services.push(menage);
    this.emitCourses();
    this.httpClient
      .put(this.auth.backend_test+"services.json", this.services)
      .subscribe( //
        () => { //
          console.log("Enregistrement ok!");
        },
        (error) => {
          if(error['status'] === 401){
            this.auth.removeUserInfo();
            console.log("#TOKEN EXPIRED");
          }
          console.log("Erreur : "+ error);
        }
      );}

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

  //Récupérer une annonce par ID depuis firebase
  getServiceById(id: number) {
    return new Promise((resolve,reject)=> {
      this.httpClient
        .get<any[]>(this.auth.backend_test+'services.json')
        .subscribe(
          (response) => {

            this.services = response;
            this.current_service = this.services.find(
              (s) => {
                return s.id === id;
              }
            );
            console.log("#SERVICE-SERVICE : current_service :", this.current_service);
            console.log("#OK");
            console.log("#SERVICES : " + response);
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

  //Récupérer une annonce par ID depuis le BACK
  /*getServiceById(id: number) {
    return new Promise((resolve,reject)=> {
      this.httpClient
        .get<any[]>(this.auth.backend + 'api/announce/' + id +
          'token=' + JSON.parse(localStorage.getItem('token'))["token"])
        .subscribe(
          (response) => { //on récupère le service mais 'content' est une string ...
            let final_service = {idUser: response["announce"]['idUser'], content: JSON.parse(response["announce"]['content']),
            id: response["announce"]['id'], price: response["announce"]['price']}; //...on le parse donc
            this.service = final_service;

            console.log("#SERVICE-SERVICE : current_service :", this.current_service);
            console.log("#OK");
            console.log("#SERVICES : " + response);
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
  }*/

}
