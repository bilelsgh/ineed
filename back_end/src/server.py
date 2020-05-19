import os
from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from datetime import date
import bcrypt
from models import *



@app.route('/api/user', methods=['POST'])
def register_user():
    if not request.json or not 'username' in request.json or not 'password' in request.json:
        abort(400)
    user = {
        'username': request.json['username'],
        'password': request.json['password']
    }
    # verify that the username does not exist in the database
    existing_user = User.query.filter_by(username=user['username']).first()
    if existing_user is not None:
        abort(400)
    hash = bcrypt.hashpw(user['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    u = User(username=user['username'], passwordHash=hash)
    db.session.add(u)
    db.session.commit()
    created_user = User.query.filter_by(username=user['username']).first()
    return jsonify({'user': created_user.to_json()}), 201


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


@app.route('/api/user/<id>', methods=['GET'])  # Get information of user only on token based
# curl -i -H "Content-Type: application/json" -X GET -d '{"token":"eyJhbGciOiJIUzUxMiIsImlhdCI6MTU4NDUyNjMyNiwiZXhwIjoxNTg0NTI3MjI2fQ.eyJpZCI6MTF9.Yt9CjdHNK3RwWBQywUwIOarAoJWpRKIMUbkgMpV7JNuMAuF4osY-HxJr3XlrJCNRQr6U-i0vFYMXt_iE7fd32A"}' http://localhost:5000/api/user/11
def get_user(id):
    if not request.json or not 'token' in request.json:
        abort(400)
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)
    if user.idUser == int(id):
        return jsonify({'user': user.to_json(), 'token': user.generate_auth_token()}), 200
    else:
        abort(403)  # Forbidden


@app.route('/api/user/<id>', methods=['PUT'])
# curl -i -H "Content-Type: application/json" -X PUT -d '{"token":"eyJhbGciOiJIUzUxMiIsImlhdCI6MTU4NDUyNzMxNCwiZXhwIjoxNTg0NTI4MjE0fQ.eyJpZCI6MTF9.zeHJLdVFu9WTjt2fHzlijIlks6aGi5EC-sUtXwWSR52RYG-ycfj6UJAEl43xWSYhOwROhJTON_mW3dCvHnhKaw","user":{"mail":"frumusica@misha_liubimii"}}' http://localhost:5000/api/user/11
def complete_profile(id):
    if not request.json or not 'token' in request.json:
        abort(400)
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)
    if user.idUser == int(id):
        user.mail = request.json['user']['mail']
        user.firstName = request.json['user']['firstName']
        user.lastName = request.json['user']['lastName']
        user.sex = request.json['user']['sex']
        user.bio = request.json['user']['bio']

        # db.session.add(user)
        db.session.commit()
        return jsonify({'user': user.to_json(), 'token': user.generate_auth_token()}), 200
    else:
        abort(403)  # Forbidden


@app.route('/api/user/<id>/photo/<token>', methods=['POST'])
def upload_photo(id, token):
    # check if the post request has the file part
    if 'file' not in request.files:
        abort(401)
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        abort(401)
    # authenticate and get the user
    user = User.verify_auth_token(token)
    if user is None or user.idUser != int(id):
        abort(403)
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        user.photo = filename
        db.session.commit()
        return jsonify({'user': user.to_json(), 'token': user.generate_auth_token()}), 200
    abort(401)


@app.route('/api/announce', methods=['POST'])
def create_announce():
    if not request.json or not 'token' in request.json or not 'announce' in request.json:
        abort(400)
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)
    if user.idUser == request.json['announce']['idUser']:
            announce = Announce(idUser=request.json['announce']['idUser'], \
                                                content=request.json['announce']['content'], \
                                                creationDate=date.today(), \
                                                price=float(request.json['announce']['price']))
            db.session.add(announce)
            db.session.commit()
            created_announce = Announce.query.filter_by(idAnnounce=announce.idAnnounce).first()
            return jsonify({'announce': created_announce.to_json(), 'token': user.generate_auth_token()}), 201
    abort(403)  # Forbidden


@app.route('/api/announce/<id>', methods=['GET'])
def get_announce(id):
    if not request.json or not 'token' in request.json:
        abort(400)  # Bad Request
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)  # Non authorized
    announce = Announce.query.filter_by(idAnnounce=int(id)).first()
    if announce:
        announce.viewNumber += 1
        db.session.commit()
        return jsonify({'announce': announce.to_json(), 'token': user.generate_auth_token()}), 200
    abort(404)  # Not Found


@app.route('/api/announce/user/<idUser>', methods=['GET'])
def get_user_announces(idUser):
    if not request.json or not 'token' in request.json:
        abort(400)
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)
    searched_user = User.query.filter_by(idUser=idUser).first()
    if searched_user:
        announces = Announce.query.filter_by(idUser=idUser)
        return jsonify({'token': user.generate_auth_token(), 'announces': [ann.to_json() for ann in announces]}), 200
    abort(404)


@app.route('/api/announce/<id>', methods=['PUT'])
def update_announce(id):
    if not request.json or not 'token' in request.json or not 'announce' in request.json:
        abort(400)  # Bad Request
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)  # Non authorized
    announce = Announce.query.filter_by(idAnnounce=int(id)).first()
    if announce:
        if announce.idUser != user.idUser:
            abort(403)  # Forbidden
        announce.content = request.json['announce']['content']
        announce.price = float(request.json['announce']['price'])
        db.session.commit()
        return jsonify({'announce': announce.to_json(), 'token': user.generate_auth_token()}), 200
    abort(404)  # Not Found

@app.route('/api/comment', methods=['POST'])
def create_comment():
    if not request.json or not 'token' in request.json or not 'comment' in request.json:
        abort(400)  # Bad Request
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)  # Non authorized
    if user is None:
        abort(401)
    if user.idUser == request.json['comment']['author']:
        comment = Comment(author=request.json['comment']['author'], \
                          content=request.json['comment']['content'], \
                          creationDate=date.today(), \
                          announce=request.json['comment']['announce'])
        db.session.add(comment)
        db.session.commit()
        created_comment = Comment.query.filter_by(idComment=comment.idComment).first()
        return jsonify({'comment': created_comment.to_json(), 'token': user.generate_auth_token()}), 201
    abort(403)  # Forbidden


@app.route('/api/comment/<id>', methods=['PUT'])
def update_comment(id):
    if not request.json or not 'token' in request.json or not 'comment' in request.json:
        abort(400)  # Bad Request
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)  # Non authorized
    comment = Comment.query.filter_by(idComment=int(id)).first()
    if comment:
        if comment.idUser != user.idUser:
            abort(403)  # Forbidden
        comment.content = request.json['comment']['content']
        db.session.commit()



@app.route('/api/comment/announce/<idAnnounce>', methods=['GET'])
def get_announce_comments(idAnnounce):
    if not request.json or not 'token' in request.json:
        abort(400)
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)
    searched_ann = Announce.query.filter_by(idAnnounce=idAnnounce).first()
    if searched_ann:
        comments = Comment.query.filter_by(announce=idAnnounce)
        return jsonify({'token': user.generate_auth_token(), 'comments': [comm.to_json() for comm in comments]}), 200
    abort(404)


@app.route('/api/review', methods=['POST'])
def create_review():
    if not request.json or not 'token' in request.json or not 'review' in request.json:
        abort(400)  # Bad Request
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)  # Non authorized
    if user is None:
        abort(401)
    if user.idUser == request.json['review']['author']:
        review = Review(author=request.json['review']['author'], \
                        content=request.json['review']['content'], \
                        creationDate=date.today(), \
                        announce=request.json['review']['announce'], \
                        note=request.json['review']['note'])
        db.session.add(review)
        db.session.commit()
        created_review = Review.query.filter_by(idReview=review.idReview).first()
        return jsonify({'review': created_review.to_json(), 'token': user.generate_auth_token()}), 201
    abort(403)  # Forbidden

@app.route('/api/Announce/helper', methods=['POST'])
def choose_helper():
    if not request.json or not 'token' in request.json or not 'helperID' in request.json:
        abort(400)
    user = User.verify_auth_token(request.json['token'])
    if user.idUser:
        chosen_answer = Answer.query.filter_by(UserID=request.json['helperID'], AnnounceID=request.json['announceID']).first()
        chosen_answer.Accepted = True
        db.session.commit()
        chosen_helper = User.query.filter_by(idUser=chosen_answer.UserID).first()
        return jsonify({'helper': chosen_helper.to_json(),'token': user.generate_auth_token()}), 201
    abort(403)

@app.route('/api/Announce/delete', methods=['DELETE'])
def delete_announce():
    if not request.json or not 'token' in request.json or not 'idAnnounce' in request.json:
        abort(400)
    user = User.verify_auth_token(request.json['token'])
    if user.idUser:
        print("hi")
        announce = Announce.query.filter_by(idAnnounce=request.json['idAnnounce'], author=user.idUser).first()
        answer = Answer.query.filter_by(AnnounceID=announce.idAnnounce).first()
        comment = Comment.query.filter_by(AnnounceID=announce.idAnnounce).first()
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

@app.route('/api/notification', methods=['POST'])
def create_notification():
    if not request.json or not 'UserID' in request.json:
        abort(400)  # Bad Request
    notification = Notification(UserID=request.json['UserID'],
                    content=request.json['content'],
                    CreationDate=date.today(),
                    context = request.json['context'],
                    treated=False)
    db.session.add(notification)
    db.session.commit()
    created_notif = Notification.query.filter_by(idNotification=notification.idNotification).first()
    return jsonify({'notification': created_notif.to_json()}), 201

@app.route('/api/notification/User', methods=['GET'])
def get_notification():
    if not request.json or not 'token' in request.json:
        abort(400)
    user = User.verify_auth_token(request.json['token'])
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
                    content=request.json['content'],
                    CreationDate=date.today(),
                    context = request.json['context'],
                    treated=False)
    db.session.add(notification)
    db.session.commit()
    created_notif = Notification.query.filter_by(idNotification=notification.idNotification).first()
    return jsonify({'notification': created_notif.to_json()}), 201

@app.route('/api/notification/User', methods=['GET'])
def get_notification():
    if not request.json or not 'token' in request.json:
        abort(400)
    user = User.verify_auth_token(request.json['token']) #on verifie si le user exist
    if user is None:
        abort(401)
    notification = Notification.query.filter_by(UserID=user.idUser).first()
    if notification:
        notifications = Notification.query.filter_by(UserID=user.idUser,treated=False)
        return jsonify({'token': user.generate_auth_token(), 'notifications': [notif.to_json() for notif in notifications]}), 200
    abort(404)


if __name__ == '__main__':
    app.run(debug=1)
