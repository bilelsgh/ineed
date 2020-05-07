
export class Cuisine{
  constructor(public idUser : number,
              public content : { type : string, name : string, user : string, description : string
              , sur_place : string, datejour : string,dateheure : string, type_de_plat : string, image : string, contry: string, city:string, adress: string},
              public id : number,
              public price : number = 0,
              public finished : boolean,){}
}

//il faut un champ "price" pour le back, donc on en met un à 0 quand y'a pas de prix
