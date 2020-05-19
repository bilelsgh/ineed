export class Notif{
  constructor(public message: string,
              public type: string,
              public id: string = '',
              public category: string = "profil") {
  }
}

export class NotifContext{
  constructor(public emitterId: string,
              public announceId: string = '-1') {
  }
}
