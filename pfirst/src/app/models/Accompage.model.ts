
export class Accompage{
  constructor(public idUser : number,
              public content : { type : string, name : string, user : string, description : string,
              kind : string, quand1 : string,quand2 : string, local : string, datejour : string,
                image : string,  city: string, latitude: number, longitude: number},

              public id : number,
              public price : number = 0,
              viewNumber : number,
              public finished : boolean,
  ){}
}

//il faut un champ "price" pour le back, donc on en met un à 0 quand y'a pas de prix
