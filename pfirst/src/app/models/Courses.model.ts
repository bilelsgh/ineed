/*export class Courses{
    constructor(public id : number,
        public image : string,
        public type:string,
        public name: string,
        public user: string,
        public description: string ,
        public accompagner : string,
        public budget : string,
        public date: string,
        public liste: Array<{produit: string, quantite: string}>,
        public idUser : number,){}
}}*/

export class Courses{
  constructor(
    public idUser: number,
    public content: { datejour: string, dateheure:string, accompagner: any, budget : string, liste: { produit: string, quantite: string }[],
    name: string, description: any,type: string, user: any, viewNumber : number, image : string },
    public id : number,
    public price: number = 0,
    public finished : boolean,
  ) {
  }
}

