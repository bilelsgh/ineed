import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {UserService} from './users.service';
import {Subject} from 'rxjs';

@Injectable()
export class SuiviService {


  public noHelper: boolean;
  public helpers: any[] = [];
  public assignees: number[] = [];
  public status : number;
  public serviceId_selected : number;

  constructor(private httpClient: HttpClient, private auth: AuthService, private userService : UserService) {}

  getHelpers(announceId: number = 0) {
    return new Promise((resolve, reject) => {

      //console.log("HELPERS : " + announceId);
      if (announceId === 0) {
        this.helpers = [];
      } else {
        this.userService.getAnnounceHelpersById(String(announceId))
          .then(() => {
            this.helpers = this.userService.announceHelpers;
            //console.table(this.userService.announceHelpers);
            this.helpers.length === 0 ? this.noHelper = true : this.noHelper = false;
            resolve(true);
          })
          .catch((e) => {
            console.log('#getHelpers : erreur de recupération ', e);
            this.helpers = [];
            reject(true);
          });
      }

    });

  }

  getAssignees(id : number = 0) {
    return new Promise((resolve, reject) => {
      if (id === 0) {
        this.assignees = [];
      }else{
        this.httpClient
          .get<any[]>(this.auth.backend + 'api/announce/' + id + '/accepted?token=' + JSON.parse(localStorage.getItem('token')))
          .subscribe(
            (response) => {
              this.assignees = response['accepted'];
              this.status = response['status'];
              this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token
            //  console.log("GET ASSIGNEES : " + id);
              //console.table(response['accepted']);
              resolve(true);
            },
            (error) => {
              if (error['status'] === 401) {
                this.auth.removeUserInfo();
                console.log('#TOKEN EXPIRED');
              }
              console.log('#DEBUG : Erreur lors de la récupération des assignees [service-activity] ' + error);
              reject(true);
            }
          );
      }
    });



  }

  deleteAnnounce(announceId : number){
    let message = {idAnnounce : announceId, token: JSON.parse(localStorage.getItem('token'))};
    this.httpClient.delete(this.auth.backend + "ap/announce/id")
      .subscribe(
        (response) => {

        },
        (error) => {
          if (error['status'] === 401) {
            this.auth.removeUserInfo();
            console.log('#TOKEN EXPIRED');
          }
        }
      )
  }



}

