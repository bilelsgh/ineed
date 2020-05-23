export class Menage{
  constructor(public idUser : number,
              public content : {type : string, name : string, user : string, description : string,
                salle : string, surface : string, datejour : string, dateheure: string,
                materiel : string[], image : string, city:string,latitude: number, longitude:number},
              public id : number,
              public price : number = 0,
              viewNumber : number,
              public finished : boolean,
  ){}
}

//il faut un champ "price" pour le back, donc on en met un à 0 quand y'a pas de prix

