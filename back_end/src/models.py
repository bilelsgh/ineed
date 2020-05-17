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

    __tablename__ = 'User'

    idUser = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), unique=True)
    firstName = db.Column(db.String(45))
    lastName = db.Column(db.String(45))
    passwordHash = db.Column(db.String(100))
    mail = db.Column(db.String(45), unique=True)
    mobile = db.Column(db.String(45))
    gender = db.Column(db.String(45))
    address = db.Column(db.String(100))
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
            'Address': self.address,
            'mobile': self.mobile,
            'gender': self.gender,
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
    categorie = db.Column(db.String(50))
    price = db.Column(db.DECIMAL)
    author = db.Column(db.Integer, db.ForeignKey('User.idUser'))
    finished = db.Column(db.Boolean)

    def __repr__(self):
        return '<Announce {}>'.format(self.idAnnounce)

    def to_json(self):
        announce = {
            'categorie': self.categorie,
            'idAnnounce': self.idAnnounce,
            'content': self.content,
            'viewNumber': self.viewNumber,
            'price': self.price,
            'author': self.author,
            'creationDate': self.creationDate,
            'finished': self.finished
        }
        return announce



class Comment(db.Model):

    __tablename__ = 'Comment'

    idComment = db.Column(db.Integer, primary_key=True)
    AnnounceID = db.Column(db.Integer, db.ForeignKey('Announce.idAnnounce'))
    author = db.Column(db.Integer, db.ForeignKey('User.idUser'))
    Date = db.Column(db.Date)
    content = db.Column(db.String(500))

    def __repr__(self):
        return '<Comment {}>'.format(self.idComment)

    def to_json(self):
        comment = {
            'idComment': self.idComment,
            'author' : self.author,
            'AnnonceId': self.AnnonceId,
            'content': self.content,
            'Date': self.Date
        }
        return comment


class Answer(db.Model):

    __tablename__ = 'Answer'

    idAnswer = db.Column(db.Integer, primary_key=True)
    UserID = db.Column(db.Integer, db.ForeignKey('User.idUser'))
    AnnounceID = db.Column(db.Integer, db.ForeignKey('Announce.idAnnounce'))
    time = db.Column(db.Date)
    Accepted = db.Column(db.Boolean, default=0)

    def __repr__(self):
        return '<Answer {}, {}>'.format(self.userID, self.announceid)

    def to_json(self):
        answer = {
            'UserId': self.UserID,
            'AnnounceId': self.AnnounceID,
            'time': self.time,
            'Accepted': self.Accepted
        }
        return answer



class Review(db.Model):

    __tablename__ = 'review'

    idReview = db.Column(db.Integer, primary_key=True)
    CreationDate = db.Column(db.Date)
    content = db.Column(db.String(600))
    grade = db.Column(db.String(50))
    author = db.Column(db.Integer, db.ForeignKey('User.idUser'))

    def __repr__(self):
        return '<notation {}>'.format(self.idnotation)

    def to_json(self):
        review = {
            'idnotation': self.idnotation,
            'CreationDate': self.CreationDate,
            'review': self.review,
            'author': self.author,
            'grade': self.grade
        }
        return review