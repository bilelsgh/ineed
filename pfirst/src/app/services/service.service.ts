import { Courses } from '../models/Courses.model';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ServiceService{

    private courses:Courses[]= [];
    coursesSubject = new Subject<Courses[]>();
    emitCourses(){
      this.coursesSubject.next(this.courses.slice());
  }
  addCourses(courses : Courses){
      this.services.push(courses);
      this.emitCourses();


    this.httpClient
      .post(this.auth.backend_test +"services.json", courses) //post() : lancer un appel POST, prend l'url visé et ce qui faut lui envoyer
      .subscribe( //                                            Cette méthode renvoie un Observable, elle ne fait pas appel à elle toute seule
        () => { //                                       c'est en y souscrivant que l'appel est lancé ; put() écrase
          console.log("Enregistrement ok!");
        },                                         //subscribe() prévoie le cas où tout fonctionne t le cas où il y a des erreurs
        (error) => {
          console.log("Erreur : "+ error);
        }
      );
  }


    services=[
        {
        id: 1,
        image:"../../assets/data/menage.png",
        type:"service1",
        name: 'Faire les courses',
        user: 'Jean Paul Gauthier',
        description: "J'ai faim la vie de maman",
        liste: [],
        accompagner:"",
        budget: 98,
        dispo:"30/03/2002"


        },
        {id:2,
        image:"../../assets/data/menage.png",
        type:"service2",
        name: 'Faire le menage',
        user: 'Jean Paul',
        description: "Esclave",
        dispo: "24/03/2020",
        surface : 50,
        materiel: []
        },
        {
        id:3,
        image:"../../assets/data/cuisine.png",
        type:"service3",
        name: 'Faire la cuisine',
        user: 'Jean Paul',
        description: "Petit con va",
        sur_place: "oui",
        type_de_plat: "fast food",
        dispo: "09/09/2009"


        },
        {id :4,
        image:"../../assets/data/accompagner.png",
        type:"service4",
        name: 'Accompagne moi gros',
        user: 'Jean Paul',
        description: "Petit con va",
        kind:"ponctuel",
        quand:"midi a 14h",
        local: "a la pischine",
        dispo:"03/04/2040"

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
