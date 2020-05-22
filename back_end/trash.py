import os
from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from datetime import date
import bcrypt #pour le hash

#Creation de l'application
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Bilel&SAGHROUCHNI73@localhost/INEED'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app) #Permet de creer la DB dans le langage Python (pas de requetes en SQL) + connexion a INEED



#Table USER
class User(db.Model):

    __tablename__ = 'User'

    idUser = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), unique=True)
    UHash = db.Column(db.String(100))
    mail = db.Column(db.String(45), unique=True)
    mobile = db.Column(db.String(45))
    gender = db.Column(db.String(45))
    Adress = db.Column(db.String(100))
    service_rendu = db.Column(db.String(100))
    service_demande = db.Column(db.String(100))
    firstName = db.Column(db.String(45))
    lastName = db.Column(db.String(45))
    bio = db.Column(db.String(200))
    notification = db.Column(db.String(100))

    #toString()
    def __repr__(self):
        return '<User {}>'.format(self.username)

    #Transforme un objet en JSON
    def to_json(self):
        user = {
            'idUser': self.idUser,
            'username': self.username,
            'mail': self.mail,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'Adress': self.Adress,
            'service_asked': self.service_rendu,
            'service_provided': self.service_donne,
            'mobile': self.mobile,
            'gender': self.gender,
            'bio': self.bio,
            'notification': self.notification,
            'user_notation': self.user_notation
        }
        return user


class Announce(db.Model):

    __tablename__ = 'Announce'

    idAnnounce = db.Column(db.Integer, primary_key=True)
    CreationDate = db.Column(db.Date)
    content = db.Column(db.String(200))
    viewNumber = db.Column(db.Integer, default=0)
    categorie = db.Column(db.String(50))
    UserId = db.Column(db.Integer, db.ForeignKey('User.idUser'))
    finished = db.Column(db.Boolean)

    def __repr__(self):
        return '<Announce {}>'.format(self.idAnnounce)

    def to_json(self):
        announce = {
            'categorie': self.categorie,
            'idAnnounce': self.idAnnounce,
            'content': self.content,
            'viewNumber': self.viewNumber,
            'UserId': self.UserId,
            'CreationDate': self.CreationDate,
            'finished': self.finished
        }
        return announce


@app.route('/api/user', methods=['POST']) #Creation de la route, execute la fonction suivante des quon a une
#requete POST sur la route  (gestion de la route)
def register_user():
    if not request.json or not 'username' in request.json or not 'password' in request.json:
        print("ici")
        abort(400)

    user = {
        'username': request.json['username'],
        'password': request.json['password']
    }
    # verify that the username does not exist in the database
    existing_user = User.query.filter_by(username=user['username']).first()
    if existing_user is not None:
        print("ce user existe")
        abort(400)
    hash = bcrypt.hashpw(user['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    u = User(username=user['username'], passwordHash=hash) #maj des champs de la table User
    db.session.add(u)
    db.session.commit()
    created_user = User.query.filter_by(username=user['username']).first()
    return jsonify({'user': created_user.to_json()}), 201

@app.route('/api/announce/all', methods=['GET'])
def get_all_announces():
    announces = Announce.query.filter_by(finished=False).all()
    return jsonify({'announces': [ann.to_json() for ann in announces]})


if __name__ == '__main__':
    app.run(debug=1)
