
export class Cuisine{
  constructor(public idUser : number,
              public content : { type : string, name : string, user : string, description : string
              lieu : string, sur_place : string, datejour : string,dateheure : string, type_de_plat : string,
                image : string},
              public id : number,
              public price : number = 0,
              public viewNumber : number,
              /*brief_assignees :
              *   - Premier élément = 0 si l'annonce attend encore des helpers
              *                     = 1 si le helped n'a plus besoin de helpers, l'annonce est alors EN COURS
              *   - Les autres éléments sont les idUser des helpers qui se sont proposés pour ce service et qui
              *  ont été acceptés par le helped*/
              public assignees : number[],
              public finished : boolean,){}
}

//il faut un champ "price" pour le back, donc on en met un à 0 quand y'a pas de prix
