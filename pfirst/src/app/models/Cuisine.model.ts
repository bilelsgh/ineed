
export class Cuisine{
  constructor(public idUser : number,
              public content : { type : string, name : string, user : string, description : string
              , sur_place : string, datejour : string,dateheure : string, type_de_plat : string, image : string, contry: string,
                city:string,latitude: number, longitude:number, rejected : number[]},

              public id : number,
              public price : number = 0,
              public viewNumber : number,
              /*brief-status
              0 : le service attend des helpers
              1 : le service est en cours et n'accepte plus d'helpers
              2 : le service est terminé
               */
              public status : number,){}
}

//il faut un champ "price" pour le back, donc on en met un à 0 quand y'a pas de prix
