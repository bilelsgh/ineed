import {Injectable} from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {subscribeOn} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class UserService{

  constructor(private httpClient: HttpClient, private auth : AuthService){}

  bio: string = "Salut a tous du coup moi c'est gilbert aka le toat.";
  fname: string = "Gilbert";
  lname: string = "Angénieux";
  rating: number = 4.5;

  services_history_for = [
    {
      pour: "Gilbert",
      par: "Bibel",
      categorie: "menage",
      note: 4.3,
      commentaire: 'Tres bon service pour vous',
      date: new Date(),
      showComment: false
    },
    {
      pour: "Gilbert",
      par: "Dhomas",
      categorie: "cuisine",
      note: 4.7,
      commentaire: 'Au top',
      date: new Date(),
      showComment: false
    },
    {
      pour: "Gilbert",
      par: "Rafel",
      categorie: "accompagnement",
      note: 4.5,
      commentaire: 'Super!',
      date: new Date(),
      showComment: false
    }
  ];
  services_history_by = [
    {
      pour: "Bibel",
      par: "Gilbert",
      categorie: "menage",
      note: 4.3,
      commentaire: 'Tres bon service par vous',
      date: new Date(),
      showComment: false
    },
    {
      pour: "Domas",
      par: "Gilbert",
      categorie: "cuisine",
      note: 4.7,
      commentaire: 'Au top',
      date: new Date(),
      showComment: false
    },
    {
      pour: "Rafel",
      par: "Gilbert",
      categorie: "accompagnement",
      note: 4.5,
      commentaire: 'Super!',
      date: new Date(),
      showComment: false
    }
  ];
  categ_to_icon = {
    "accompagnement": "../../assets/data/accompagner.png",
    "course": "../../assets/data/courses.png",
    "cuisine": "../../assets/data/cuisine.png",
    "menage":"../../assets/data/menage.png"
  };

  //services_history: any[];

  ngOnInit(){
    this.getUserInfosFromServer();
  }

  idx = 0;

  showAllComments: boolean = false;

  setShowAllComments(){
    this.showAllComments = true;
    console.log('userServ : showAll set a true');
  }

  resetShowAllComments(){
    this.showAllComments = false;
    console.log('userServ : showAll reset a false');
  }

  getNiveau(): number{
    return (Math.floor((this.services_history_for.length + this.services_history_by.length)/5) + 1);//pour le moment 5 services dans chaque niveau
  }

  saveUserInfosToServer(){
    this.httpClient.put(this.auth.backend + 'userInfos.json',this.services_history_for)
      .subscribe(()=>{console.log('save done');},(err)=>{console.log('Erreur de save '+err);});

  }

  getUserInfosFromServer(){
    this.httpClient
      .get<any[]>(this.auth.backend)
      .subscribe((got)=>{
          this.services_history_for=got;
        },
        (err)=>{
          console.log("Erreur de récupération"+err);
        }
      );
  }
  public getInitials(){
    let res: string = this.fname[0].toUpperCase()+this.lname[0].toUpperCase();
    console.log(res);
    return res;
  }
}
