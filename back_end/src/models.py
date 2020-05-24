from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/Ineedtest'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'lesid'

db = SQLAlchemy(app)

app.config['UPLOAD_FOLDER'] = './static/images'


class User(db.Model):

    __tablename__ = 'Users'

    idUser = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), unique=True)
    firstName = db.Column(db.String(45))
    lastName = db.Column(db.String(45))
    passwordHash = db.Column(db.String(100))
    mail = db.Column(db.String(45), unique=True)
    photo = db.Column(db.String(200))
    sex = db.Column(db.String(45))
    bio = db.Column(db.String(200))

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def to_json(self):
        user = {
            'idUser': self.idUser,
            'username': self.username,
            'mail': self.mail,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'photo': self.photo,
            'sex': self.sex,
            'bio': self.bio,
        }
        return user
    def generate_auth_token(self, expiration=900):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.idUser})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None  # valid token, but expired
        except BadSignature:
            return None  # invalid token
        user = User.query.get(data['id'])
        return user


class Announce(db.Model):

    __tablename__ = 'Announce'

    idAnnounce = db.Column(db.Integer, primary_key=True)
    creationDate = db.Column(db.Date)
    content = db.Column(db.String(200))
    viewNumber = db.Column(db.Integer, default=0)
    price = db.Column(db.DECIMAL)
    idUser = db.Column(db.Integer, db.ForeignKey('Users.idUser'))
    status = db.Column(db.Integer, default=0)

    def __repr__(self):
        return '<Announce {}>'.format(self.idAnnounce)

    def to_json(self):
        announce = {
            'idAnnounce': self.idAnnounce,
            'content': self.content,
            'viewNumber': self.viewNumber,
            'price': self.price,
            'idUser': self.idUser,
            'creationDate': self.creationDate,
            'status': self.status
        }
        return announce



class Comment(db.Model):

    __tablename__ = 'Comment'

    idComment = db.Column(db.Integer, primary_key=True)
    announce = db.Column('idAnnounce',db.Integer, db.ForeignKey('Announce.idAnnounce'))
    author = db.Column(db.Integer, db.ForeignKey('Users.idUser'))
    creationDate = db.Column(db.Date)
    content = db.Column(db.String(500))

    def __repr__(self):
        return '<Comment {}>'.format(self.idComment)

    def to_json(self):
        comment = {
            'idComment': self.idComment,
            'author':self.author,
            'announce': self.announce,
            'content': self.content,
            'creationDate': self.creationDate
        }
        return comment


class Answer(db.Model):

    __tablename__ = 'Answer'

    userID = db.Column(db.Integer, db.ForeignKey('Users.idUser'), primary_key=True)
    announceid = db.Column(db.Integer, db.ForeignKey('Announce.idAnnounce'), primary_key=True)
    time = db.Column(db.Date)
    accepted = db.Column(db.Boolean, default=0, nullable=False)

    def __repr__(self):
        return '<Answer {}, {}>'.format(self.userID, self.announceid)

    def to_json(self):
        answers = {
            'UserId': self.UserID,
            'announceid': self.announceid,
            'time': self.time,
            'accepted': self.accepted
        }
        return answers


class Review(db.Model):

    __tablename__ = 'Review'

    idReview = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.Integer, db.ForeignKey('Users.idUser'))
    announce = db.Column(db.Integer, db.ForeignKey('Announce.idAnnounce'))
    creationDate = db.Column(db.Date)
    content = db.Column(db.String(200))
    note = db.Column(db.Integer)

    def __repr__(self):
        return '<Review {}>'.format(self.idReview)

    def to_json(self):
        review = {
            'idReview': self.idReview,
            'author': self.author,
            'announce': self.announce,
            'content': self.content,
            'creationDate': self.creationDate,
            'note': self.note
        }
        return review

class Notification(db.Model):

    __tablename__ = 'Notification'

    idNotification = db.Column(db.Integer, primary_key=True)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.idUser'))
    CreationDate = db.Column(db.Date)
    content = db.Column(db.String(600))
    context = db.Column(db.String(100))
    treated = db.Column(db.Boolean)
    updater = db.Column(db.String(50))

    def __repr__(self):
        return '<notification {}>'.format(self.idNotification)

    def to_json(self):
        notification = {
            'idNotification': self.idNotification,
            'UserID': self.UserID,
            'CreationDate': self.CreationDate,
            'context': self.context,
            'content': self.content
        }
        return notification