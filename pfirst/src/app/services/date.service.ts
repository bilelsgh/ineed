import { Injectable } from '@angular/core';

@Injectable()

export class DateService{
    date=new Date()
    day =this.date.getDate().toString();

    mm = this.date.getMonth()+1;
    mois= this.mm.toString();
    yr = this.date.getFullYear().toString();
    actu: string;
    constructor(){
        if(this.day.length<2){
            this.day="0"+this.day;
          }
          if(this.mois.length<2){
            this.mois="0"+this.mois;
          }
          this.actu=this.yr+"-"+ this.mois+"-"+ this.day;
      }

    }

    