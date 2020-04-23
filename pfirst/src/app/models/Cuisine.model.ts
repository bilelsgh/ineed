export class Cuisine{
    constructor(public id : number,
        public image : string,
        public type:string,
        public name: string,
        public user: string,
        public description: string ,
        public lieu : string,
        public sur_place : string,
        public date: string,
        public type_de_plat: string,
        public id_user : number,){}
}
/*export class Cuisine{
  constructor(public idUser : number,
              public content : {id : number, type : string, name : string, user : string, description : string
              lieu : string, sur_place : string, date : string, type_de_plat : string, image : string},
              public price : number = 0,){}
}*/

//il faut un champ "price" pour le back, donc on en met un à 0 quand y'a pas de prix
