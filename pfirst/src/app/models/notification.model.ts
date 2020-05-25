export class Notif{
  constructor(public message: string,
              public type: string,
              public idNot: string = '', //id dans le back, mis a jour lors du GET mais pas utilisé pour l'instant
              public category: string = 'profil' // 'activity' | 'profil | 'infos'
  ) {}
}

export class NotifContext{
  constructor(public detail: string,              // 'helpProposed' | 'helpAccepted' | 'helpRefused' | 'serviceStart'
                                                  // | 'reviewExpected' | 'pdpUpload' | 'bioUpload'
              public emitterId: number = JSON.parse(localStorage.getItem('user')).idUser,
              public announceId: number = -1 // -1 signifie que la notif n'a pas de rapport avec une annonce

) {}
}
