import os
from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from datetime import date
import bcrypt
from models import *



@app.route('/api/user/login', methods=['POST'])
##curl -i -H "Content-Type: application/json" -X POST -d '{"username":"Misha10", "password":"Frumusica"}' http://localhost:5000/api/user/login
def login():
    if not request.json or not 'username' in request.json or not 'password' in request.json:
        abort(400)
    user = {
        'username': request.json['username'],
        'password': request.json['password']
    }
    existing_user = User.query.filter_by(username=user['username']).first()
    if existing_user is None:
        abort(400)

    if bcrypt.checkpw(user['password'].encode('utf-8'), existing_user.passwordHash.encode('utf-8')):
        print("Password match!")
        # Log the user in ...
        return jsonify({'token': existing_user.generate_auth_token(), 'user': existing_user.to_json()}), 200
    else:
        print("Password didn't match")
        abort(401)

@app.route('/api/announce/<int:id>/helper', methods=['POST'])
def choose_helper(id):
    if not request.json or not 'token' in request.json or not 'helperID' in request.json:
        abort(400)
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)
    announce = Announce.query.filter_by(idAnnounce=id).first()
    if announce.idUser != user.idUser:
        abort(403)
    if announce.status != 0:
        abort(403)
    chosen_answer = Answer.query.filter_by(userID=request.json['helperID'], announceid=id).first()
    chosen_answer.accepted = True
    db.session.commit()
    chosen_helper = User.query.filter_by(idUser=chosen_answer.userID).first()
    return jsonify({'helper': chosen_helper.to_json(),'token': user.generate_auth_token()}), 201

@app.route('/api/announce/<int:id>', methods=['DELETE'])
def delete_announce(id):
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user:
        announce = Announce.query.filter_by(idAnnounce=id, idUser=user.idUser).first()
        answer = Answer.query.filter_by(announceid=id).first()
        comment = Comment.query.filter_by(announce=id).first()
        if answer:
            db.session.delete(answer)
            db.session.commit()
        if comment:
            db.session.delete(comment)
            db.session.commit()
        db.session.delete(announce)
        db.session.commit()
        return jsonify({'response': "this announce was deleted successfully",'token': user.generate_auth_token()}), 201
    abort(403)


@app.route('/api/notification/user', methods=['GET'])
def get_notification():
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)
    notification = Notification.query.filter_by(UserID=user.idUser).first()
    if notification:
        notifications = Notification.query.filter_by(UserID=user.idUser,treated=False)
        return jsonify({'token': user.generate_auth_token(), 'notifications': [notif.to_json() for notif in notifications]}), 200
    abort(404)

@app.route('/api/notification', methods=['POST'])
def create_notification():
    if not request.json or not 'UserID' in request.json:
        abort(400)  # Bad Request
    notification = Notification(UserID=request.json['UserID'],
                    content= request.json['content'],
                    CreationDate=date.today(),
                    context = request.json['context'],
                    treated=False)
    db.session.add(notification)
    db.session.commit()
    created_notif = Notification.query.filter_by(idNotification=notification.idNotification).first()
    return jsonify({'notification': created_notif.to_json()}), 201


@app.route('/api/announce/review/<int:id>', methods=['GET'])
def get_review(id):
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)
    if user:
        review = Review.query.filter_by(announce=id).first()
        return jsonify({'token': user.generate_auth_token(), 'review': review.to_json()}), 200
    abort(404)

if __name__ == '__main__':
    app.run(debug=1)