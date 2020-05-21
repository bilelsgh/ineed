export class Notif{
  constructor(public message: string,
              public type: string,
              public idNot: string = '',
              public category: string = "profil" // 'activity' | 'profil | 'infos'
  ) {
  }
}

export class NotifContext{
  constructor(public emitterId: string = JSON.parse(localStorage.getItem('user')).idUser,
              public announceId: string = '-1', // -1 signifie que la notif n'a pas de rapport avec une annonce
              public detail: string = 'helpProposed'// 'helpProposed' | 'helpAccepted' | 'helpRefused' | 'serviceStart' | 'serviceOver'
  ) {}
}
