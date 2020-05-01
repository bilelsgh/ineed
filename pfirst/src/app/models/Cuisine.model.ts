
export class Cuisine{
  constructor(public idUser : number,
              public content : { type : string, name : string, user : string, description : string
              lieu : string, sur_place : string, datejour : string, type_de_plat : string, image : string},
              public id : number,
              public price : number = 0,){}
}

//il faut un champ "price" pour le back, donc on en met un à 0 quand y'a pas de prix
