export class Courses{
    constructor(public id : number,
        public image : string,
        public type:number,
        public name: string,
        public user: string,
        public description: string ,
        public accompagner : string,
        public budget : number,
        public date: string,
        public liste: Array<{produit: string, quantite: string}>,
        public id_user : number,){}
}
