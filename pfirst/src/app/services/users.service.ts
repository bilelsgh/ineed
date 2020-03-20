import {Injectable} from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {subscribeOn} from 'rxjs/operators';

@Injectable()
export class UserService{

  constructor(private httpClient: HttpClient){}

  bio: string = "Salut a tous du coup moi c'est gilbert aka le toat."

  services_history = [
    {
      note: 4.3,
      commentaire: 'Tres bon service',
      date: new Date(),
      showComment: false
    },
    {
      note: 4.7,
      commentaire: 'Au top',
      date: new Date(),
      showComment: false
    },
    {
      note: 4.5,
      commentaire: 'Super!',
      date: new Date(),
      showComment: false
    }
  ];

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
    return (Math.floor(this.services_history.length/5) + 1);//pour le moment 5 services dans chaque niveau
  }

  saveUserInfosToServer(){
    this.httpClient.put('https://httpclient-tuto.firebaseio.com/userInfos.json',this.services_history)
      .subscribe(()=>{console.log('save done');},(err)=>{console.log('Erreur de save '+err);});

  }

  getUserInfosFromServer(){
    this.httpClient
      .get<any[]>('https://httpclient-tuto.firebaseio.com/')
      .subscribe((got)=>{
          this.services_history=got;
        },
        (err)=>{
          console.log("Erreur de récupération"+err);
        }
      );
  }
}
