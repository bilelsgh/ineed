
export class Courses{
  constructor(
    public idUser: number,
    public content: { datejour: string, dateheure:string, accompagner: any, budget : string, liste: { produit: string, quantite: string }[],
    name: string, description: any,type: string, user: any, image : string },
    public id : number,
    public price: number = 0,
    public viewNumber : number,
    /*brief_assignees :
              *   - Premier élément = 0 si l'annonce attend encore des helpers
              *                     = 1 si le helped n'a plus besoin de helpers, l'annonce est alors EN COURS
              *   - Les autres éléments sont les idUser des helpers qui se sont proposés pour ce service et qui
              *  ont été acceptés par le helped*/
    public assignees : number[],
    public finished : boolean,
  ) {
  }
}

