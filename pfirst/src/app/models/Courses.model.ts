export class Courses{
    constructor(public id : number,
        public image : string,
        public type:string,
        public name: string,
        public user: string,
        public description: string ,
        public accompagner : string,
        public budget : number,
        public date: string,
        public liste: Array<{produit: string, quantite: string}>,
        public idUser : number,){}
}

/*export class Courses{
  constructor(
    public idUser: number,
    public content: { date: any, accompagner: any, liste: { produit: string, quantite: string }[],
    name: string, description: any, id: number, type: string, user: any, image : string },
    public price: number,
  ) {
  }
}*/
