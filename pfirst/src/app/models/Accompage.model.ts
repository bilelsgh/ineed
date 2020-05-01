export class Accompage{
    constructor(public id : number,
        public image : string,
        public type:string,
        public name: string,
        public user: string,
        public description: string ,
        public kind : string,
        public quand : string,
        public local: string,
        public date: string,
        public id_user : number,
         ){}
}
/*export class Accompage{
  constructor(public idUser : number,
              public content : {id : number, type : string, name : string, user : string, description : string,
              kind : string, quand : string, local : string, date : string, image : string},
              public price : number = 0,
  ){}
}*/

//il faut un champ "price" pour le back, donc on en met un à 0 quand y'a pas de prix
