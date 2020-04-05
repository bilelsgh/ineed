export class Courses{
    constructor(public id : number,
        public image : string,
        public type:string,
        public name: string,
        public user: string,
        public description: string ,
        public accompagner : string,
        public budget : number,
        public dispo: string,
        public liste: Array<{produit: string, quantite: string}> ){}
}
