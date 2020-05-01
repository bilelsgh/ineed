export class Menage{
    constructor(public id : number,
        public image : string,
        public type:string,
        public name: string,
        public user: string,
        public description: string ,
        public salle : string,
        public localisation: string,
        public surface : number,
        public date: string,
        public heure: string,
        public materiel: string[],
        public id_user : number,
         ){}
}

/*export class Menage{
  constructor(public idUser : number,
              public content : {id : number, type : string, name : string, user : string, description : string,
                salle : string, localisation : string, surface : number, date : string, heure : string,
                materiel : string[], image : string},
              public price : number = 0,
  ){}
}*/

//il faut un champ "price" pour le back, donc on en met un à 0 quand y'a pas de prix

