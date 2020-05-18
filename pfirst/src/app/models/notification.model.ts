export class Notif{
  constructor(public message: string,
              public type: string,
              public idFront: string,
              public category: string = "profil") {
  }
}
