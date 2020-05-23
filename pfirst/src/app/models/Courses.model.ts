

export class Courses{
  constructor(
    public idUser: number,
    public content: { datejour: string, dateheure:string, accompagner: any, budget : string, liste: { produit: string, quantite: string }[],
    name: string, description: any,type: string, user: any, image : string, city: string, adress: string,latitude:number,longitude:number},
    public id : number,
    public price: number = 0,
    viewNumber : number,
    public finished : boolean,
  ) {
  }
}

