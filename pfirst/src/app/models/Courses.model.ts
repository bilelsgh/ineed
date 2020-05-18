
export class Courses{
  constructor(
    public idUser: number,
    public content: { datejour: string, dateheure:string, accompagner: any, budget : string, liste: { produit: string, quantite: string }[],
    name: string, description: any,type: string, user: any, image : string },
    public id : number,
    public price: number = 0,
    public viewNumber : number,
    /*brief-status
    0 : le service attend des helpers
    1 : le service est en cours et n'accepte plus d'helpers
    2 : le service est terminé
     */
    public status : number,
    public finished : boolean,
  ) {
  }
}

