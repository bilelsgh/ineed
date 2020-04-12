export class Menage{
    constructor(public id : number,
        public image : string,
        public type:number,
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
