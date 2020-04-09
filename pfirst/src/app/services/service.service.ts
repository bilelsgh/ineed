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
      .post(this.auth.backend+"services.json", cuisine)
      .subscribe( //
        () => { //
          console.log("Enregistrement ok!");
        },
        (error) => {
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
      .post(this.auth.backend+"services.json", accompage)
      .subscribe( //
        () => { //
          console.log("Enregistrement ok!");
        },
        (error) => {
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

  addCourses(courses : Courses){
    courses.id=this.services[(this.services.length - 1)].id + 1
    this.services.push(courses);
    this.emitCourses();

    this.httpClient
      .post(this.auth.backend+"services.json", courses) //post() : lancer un appel POST, prend l'url visé et ce qui faut lui envoyer
      .subscribe( //                                            Cette méthode renvoie un Observable, elle ne fait pas appel à elle toute seule
        () => { //                                       c'est en y souscrivant que l'appel est lancé ; put() écrase
          console.log("Enregistrement ok!");
        },                                         //subscribe() prévoie le cas où tout fonctionne t le cas où il y a des erreurs
        (error) => {
          console.log("Erreur : "+ error);
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
      .post(this.auth.backend+"services.json", menage)
      .subscribe( //
        () => { //
          console.log("Enregistrement ok!");
        },
        (error) => {
          console.log("Erreur : "+ error);
        }
      );}

  services=[
    {
      id: 1,
      image:"../assets/data/cuisine_pour_annonce_courte.jpg",
      type:"service1",
      name: 'Faire les courses',
      user: 'Jean Paul Gauthier',
      description: "J'ai faim la vie de maman",
      liste: [],
      accompagner:"",
      budget: 98,
      date:"30/03/2002"


    },
    {id:2,
      image:"../assets/data/V1/menage.jpg",
      type:"service2",
      name: 'Faire le menage',
      user: 'Jean Paul',
      description: "Mon copain va m' aider",
      date: "24/03/2020",
      heure: "9:00 PM ",
      surface : 50,
      materiel: ["un ballai","une eponge","autre"],
      salle: "Sallon",
      localisation:"Chez moi a chassiue",
    },
    {
      id:3,
      image:"../assets/data/cuisine_pour_annonce_courte.jpg",
      type:"service3",
      name: 'Faire la cuisine',
      user: 'Jean Paul',
      description: "Salut mec",
      sur_place: "oui",
      type_de_plat: "fast food",
      date: "09/09/2009"


    },
    {id :4,
      image:"../assets/data/V2/accompagner.jpg",
      type:"service4",
      name: 'Accompagne moi gros',
      user: 'Jean Paul',
      description: "Salut mec",
      kind:"ponctuel",
      quand:"midi a 14h",
      local: "a la pischine",
      date:"03/04/2040"

    }
  ];

  constructor(private httpClient : HttpClient, private auth : AuthService){
  }

  getServiceById(id: number) {
    const service = this.services.find(
      (s) => {
        return s.id === id;
      }
    );
    return service;
  }
}
