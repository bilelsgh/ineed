from models import *
import bcrypt
from datetime import date

# on supprime tous et insere nos donnes stable
db.drop_all()
db.create_all()

#pour la table User
usernames = ["sidi","bilel","romina","thomas","allan","gabriel","momo","tata","toto","titi","sam","soso","susie"]
passw = "testpass"
hash = bcrypt.hashpw(passw.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
mails = ["sidi@gmail.com","bilel@gmail.com","romina@gmail.com","thomas@gmail.com","allan@gmail.com","gabriel@gmail.com","momo@gmail.com","tata@gmail.com","toto@gmail.com","titi@gmail.com","sam@gmail.com","soso@gmail.com","susie@gmail.com"]

#pour la table announce
content_i = "Bonsoir a tous je voudrais que quelqu'un m'aide a faire manger durant ce week-end, Merci d'avance"

for i in range(len(usernames)):
    user = User(username= usernames[i],passwordHash=hash,mail=mails[i])
    db.session.add(user)
    db.session.commit()
    announce = Announce(idUser=user.idUser, content=content_i, creationDate=date.today(), status=0)
    db.session.add(announce)
    db.session.commit()
    if i>3: # to make sure that an author doesn't propose to himself and for each announce we get 3 propositions
        for j in range(3):
            answer = Answer(userID= (user.idUser)-j,announceid=announce.idAnnounce,time = date.today(),accepted= False)
            db.session.add(answer)
            db.session.commit()

