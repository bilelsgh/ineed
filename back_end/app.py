import os
from flask import Flask, request, jsonify, abort, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import aliased
from werkzeug.utils import secure_filename
from datetime import date
import bcrypt
import random
import string


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:3306/ineed'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'Ya liubliu Mishu'
db = SQLAlchemy(app)
app.config['UPLOAD_FOLDER'] = './static/images'
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

from models import User, Announce, Comment, Review, Answer, Notification


@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify("Hello Sweetie ;)"), 200

@app.route('/api/user', methods=['POST'])
def register_user():
    if not request.json or not ('username' in request.json or 'mail' in request.json) or not 'password' in request.json:
        abort(400)
    if 'username' in request.json:
        username = request.json['username']
    else:
        username = request.json['mail']
    user = {
        'username' : username,
        'password' : request.json['password'],
        'firstName' : request.json['firstName'],
        'lastName' : request.json['lastName'],
        'sex' : request.json['sex'],
        'mail' : request.json['mail']
    }
    #verify that the username does not exist in the database
    existing_user = User.query.filter_by(username=user['username']).first()
    if existing_user is not None:
        abort(400)
    hash = bcrypt.hashpw(user['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    u = User(username=user['username'], passwordHash=hash)
    u.firstName = user['firstName']
    u.lastName = user['lastName']
    u.sex = user['sex']
    u.mail = user['mail']
    u.photo = 'photo_undefined.png'
    db.session.add(u)
    db.session.commit()
    created_user = User.query.filter_by(username=user['username']).first()
    return jsonify({'token' : created_user.generate_auth_token(), 'user' : created_user.to_json()}), 201

@app.route('/api/user/login', methods=['POST'])
##curl -i -H "Content-Type: application/json" -X POST -d '{"username":"Misha10", "password":"Frumusica"}' http://localhost:5000/api/user/login
def login():
    if not request.json or not ('username' in request.json or 'mail' in request.json) or not 'password' in request.json:
        abort(400)
    if 'username' in request.json:
        username = request.json['username']
    else:
        username = request.json['mail']
    user = {
        'username' : username,
        'password' : request.json['password']
    }
    existing_user = User.query.filter_by(username=user['username']).first()
    if existing_user is None:
        abort(400)
    
    if bcrypt.checkpw(user['password'].encode('utf-8'), existing_user.passwordHash.encode('utf-8')):
        print("Password match!")
        # Log the user in ...
        return jsonify({'token' : existing_user.generate_auth_token(), 'user' : existing_user.to_json()}), 200
    else:
        print("Password didn't match")
        abort(401)

@app.route('/api/user/<int:id>', methods=['GET'])   #Get information of user only on token based
#curl -i -H "Content-Type: application/json" -X GET -d '{"token":"eyJhbGciOiJIUzUxMiIsImlhdCI6MTU4NDUyNjMyNiwiZXhwIjoxNTg0NTI3MjI2fQ.eyJpZCI6MTF9.Yt9CjdHNK3RwWBQywUwIOarAoJWpRKIMUbkgMpV7JNuMAuF4osY-HxJr3XlrJCNRQr6U-i0vFYMXt_iE7fd32A"}' http://localhost:5000/api/user/11
def get_user(id):
    if not 'token' in request.args:
        abort(400)
    auth_user = User.verify_auth_token(request.args['token'])
    if auth_user is None:
        abort(401)
    #if user.idUser == int(id):
    user = User.query.filter_by(idUser=id).first()
    if user is None:
        abort(404)
    return jsonify({'user' : user.to_json(), 'token' : auth_user.generate_auth_token()}), 200
    #else:
    #    abort(403) #Forbidden

@app.route('/api/user/<int:id>', methods=['PUT'])    
#curl -i -H "Content-Type: application/json" -X PUT -d '{"token":"eyJhbGciOiJIUzUxMiIsImlhdCI6MTU4NDUyNzMxNCwiZXhwIjoxNTg0NTI4MjE0fQ.eyJpZCI6MTF9.zeHJLdVFu9WTjt2fHzlijIlks6aGi5EC-sUtXwWSR52RYG-ycfj6UJAEl43xWSYhOwROhJTON_mW3dCvHnhKaw","user":{"mail":"frumusica@misha_liubimii"}}' http://localhost:5000/api/user/11
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
        
        #db.session.add(user)
        db.session.commit()
        return jsonify({'user' : user.to_json(), 'token' : user.generate_auth_token()}), 200
    else:
        abort(403) #Forbidden

@app.route('/api/user/<int:id>/password', methods=['PUT'])
def change_password(id):
    if not request.json or not 'Authorization' in request.headers or not "password" in request.json:
        abort(400)
    user = User.verify_auth_token(request.headers['Authorization'])
    if user is None:
        abort(401)
    if user.idUser == int(id):
        user.passwordHash = bcrypt.hashpw(request.json['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        db.session.commit()
        resp = make_response(jsonify(user.to_json()), 200)
        resp.headers['Authorization'] = user.generate_auth_token()
        return resp
    else:
        abort(403)


@app.route('/api/user/<int:id>/photo', methods=['POST'])
def upload_photo(id):
    # check if the post request has the file part
    if not 'token' in  request.args:
        abort(400)
    if 'file' not in request.files:
        abort(401)
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        abort(401)
    #authenticate and get the user
    user = User.verify_auth_token(request.args['token'])
    if user is None or user.idUser != int(id):
        abort(403)
    if file:
        filename_random = ''.join(random.choice(string.ascii_lowercase) for i in range(10))
        filename = secure_filename(filename_random + os.path.splitext(file.filename)[1])

        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        user.photo = filename
        db.session.commit()
        return jsonify({'user' : user.to_json(), 'token' : user.generate_auth_token()}), 200
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
        return jsonify({'announce' : created_announce.to_json(), 'token' : user.generate_auth_token()}), 201
    abort(403) # Forbidden


@app.route('/api/announce/<int:id>', methods=['GET'])
def get_announce(id):
    if not 'token' in request.args:
        abort(400) # Bad Request
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401) # Non authorized
    announce = Announce.query.filter_by(idAnnounce=int(id)).first()
    if announce:
        announce.viewNumber += 1
        db.session.commit()
        return jsonify({'announce' : announce.to_json(), 'token' : user.generate_auth_token()}), 200
    abort(404) #Not Found

@app.route('/api/announce/user/<int:idUser>', methods=['GET'])
def get_user_announces(idUser):
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)
    searched_user = User.query.filter_by(idUser=idUser).first()
    if searched_user:
        announces = Announce.query.filter_by(idUser=idUser)
        return jsonify({'token' : user.generate_auth_token(), 'announces' : [ann.to_json() for ann in announces]}), 200
    abort(404)

@app.route('/api/announce/<int:id>', methods=['PUT'])
def update_announce(id):
    if not request.json or not 'token' in request.json or not 'announce' in request.json:
        abort(400) # Bad Request
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401) # Non authorized

    announce = Announce.query.filter_by(idAnnounce=id).first()

    if announce:
        if announce.idUser != user.idUser:
            abort(403) # Forbidden
        announce.content = request.json['announce']['content']
        announce.price = float(request.json['announce']['price'])

        announce.status = request.json['announce']['status']

        db.session.commit()
        return jsonify({'announce' : announce.to_json(), 'token' : user.generate_auth_token()}), 200
    abort(404) #Not Found


@app.route('/api/announce/<int:id>', methods=['DELETE'])
def delete_announce(id):
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user:
        announce = Announce.query.filter_by(idAnnounce=id, idUser=user.idUser).first()
        if announce is None:
            abort(404)
        answers = Answer.query.filter_by(announceid=id).all()
        comments = Comment.query.filter_by(announce=id).all()
        for answer in answers:
            db.session.delete(answer)
        for comment in comments:
            db.session.delete(comment)
        db.session.delete(announce)
        db.session.commit()
        return jsonify({'response': "this announce was deleted successfully", 'token': user.generate_auth_token()}), 204
    abort(403)

@app.route('/api/comment', methods=['POST'])
def create_comment():
    if not request.json or not 'token' in request.json or not 'comment' in request.json:
        abort(400) # Bad Request
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401) # Non authorized
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
        return jsonify({'comment' : created_comment.to_json(), 'token' : user.generate_auth_token()}), 201
    abort(403) # Forbidden

@app.route('/api/comment/<int:id>', methods=['PUT'])
def update_comment(id):
    if not request.json or not 'token' in request.json or not 'comment' in request.json:
        abort(400) # Bad Request
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401) # Non authorized
    comment = Comment.query.filter_by(idComment=int(id)).first()
    if comment:
        if comment.idUser != user.idUser:
            abort(403) # Forbidden
        comment.content = request.json['comment']['content']
        db.session.commit()
        return jsonify({'comment' : comment.to_json(), 'token' : user.generate_auth_token()}), 200
    abort(404) #Not Found

@app.route('/api/comment/announce/<int:idAnnounce>', methods=['GET'])
def get_announce_comments(idAnnounce):
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)
    searched_ann = Announce.query.filter_by(idAnnounce=idAnnounce).first()
    if searched_ann:
        comments = Comment.query.filter_by(announce=idAnnounce)
        return jsonify({'token' : user.generate_auth_token(), 'comments' : [comm.to_json() for comm in comments]}), 200
    abort(404)

@app.route('/api/review', methods=['POST'])
def create_review():
    if not request.json or not 'token' in request.json or not 'review' in request.json:
        abort(400) # Bad Request
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401) # Non authorized

    if user.idUser == request.json['review']['author']:
        review = Review(author=request.json['review']['author'], \
            receiver=request.json['review']['receiver'], \
            content=request.json['review']['content'], \
            creationDate=date.today(), \
            announce=request.json['review']['announce'], \
            note=request.json['review']['note'])
        db.session.add(review)
        db.session.commit()
        created_review = Review.query.filter_by(idReview=review.idReview).first()
        return jsonify({'review' : created_review.to_json(), 'token' : user.generate_auth_token()}), 201
    abort(403) # Forbidden


@app.route('/api/review/user/<int:id>', methods=['GET'])
def get_reviews(id):
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)
    reviews = Review.query.filter_by(receiver=id).all()
    return jsonify({'token': user.generate_auth_token(), 'reviews': [review.to_json() for review in reviews]}), 200


@app.route('/api/announce/<int:id>/apply', methods=['POST'])
def apply_to_announce(id):
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)   
    answers = Answer(userID = user.idUser, \
        announceid = id, \
        time = date.today(),\
        accepted = 0)
    db.session.add(answers)
    db.session.commit()
    return '', 200

@app.route('/api/user/<int:id>/helpers', methods=['GET'])
def get_helpers(id):
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)   
    asking_user = aliased(User)
    #answered_user = aliased(User)
    helpers = User.query.join(Answer, Answer.userID==User.idUser).\
        join(Announce, Answer.announceid==Announce.idAnnounce).\
        join(asking_user, Announce.idUser==asking_user.idUser).\
        filter(asking_user.idUser==id).\
        all()
    return jsonify({'token' : user.generate_auth_token(), 'helpers' : [helper.to_json() for helper in helpers]}), 200    

@app.route('/api/announce/<int:id>/helpers', methods=['GET'])
def get_announce_helpers(id):
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)
    helpers = User.query.join(Answer, Answer.userID==User.idUser).\
        filter(Answer.announceid==id).\
        all()

    return jsonify({'token' : user.generate_auth_token(), 'helpers' : [helper.to_json() for helper in helpers]}), 200

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

@app.route('/api/announce/<int:id>/accepted', methods=['GET'])
def get_accepted(id):
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)
    announce = Announce.query.filter_by(idAnnounce=id).first()
    if announce is None:
        abort(404)
    accepted_users = Answer.query.filter_by(announceid=id, accepted=True).all()
    return jsonify({'token': user.generate_auth_token(), 'accepted': [answer.userID for answer in accepted_users], 'status': announce.status}), 200

@app.route('/api/announce/historique/<int:id>', methods=['GET'])
def get_old_services(id):
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)
    doneS = Announce.query.join(Answer, Answer.userID == id,
    ).filter(
        Announce.status==2,
    ).filter(
        Answer.announceid == Announce.idAnnounce,
    ).filter(
        Answer.accepted == True,
    ).all()
    make = Announce.query.filter(Announce.idUser == id, Announce.status == 2).all()
    return jsonify({'token': user.generate_auth_token(), 'historique': [dnn.to_json() for dnn in doneS], 'make': [mnn.to_json() for mnn in make] }), 200

@app.route('/api/announce/undone', methods=['GET'])
def get_undone():
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)
    undoneS = Announce.query.join(Answer, Answer.userID == user.idUser,
    ).filter(
        Announce.status != 2,
    ).filter(
        Answer.announceid == Announce.idAnnounce,
    ).all()
    return jsonify({'token': user.generate_auth_token(),'undoneS' : [unn.to_json() for unn in undoneS]}), 200

@app.route('/api/announce/helpers', methods=['GET'])
def get_announces_need_more_helpers():
    announces = Announce.query.filter(Announce.status != 2).order_by(Announce.creationDate.desc()).all()
    return jsonify({'announces': [ann.to_json() for ann in announces]}), 200

@app.route('/api/announce/home', methods=['GET'])
def get_all_announces():
    announces = Announce.query.filter_by(status=0).order_by(Announce.creationDate.desc()).all()
    return jsonify({'announces': [ann.to_json() for ann in announces]}), 200

@app.route('/api/announce/home/<int:x>', methods=['GET'])
def get_recent_announces(x):
    announces = Announce.query.filter_by(status=0).order_by(Announce.creationDate.desc()).limit(x).all()
    return jsonify({'announces': [ann.to_json() for ann in announces]}), 200

@app.route('/api/notification', methods=['POST'])
def create_notification():
    if not request.json or not 'userId' in request.json or not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)
    notification = Notification(userId=request.json['userId'], \
                     content=request.json['content'], \
                     creationDate=date.today(), \
                     context=request.json['context'], \
                     treated=False, \
                     updater=request.json['updater'])
    db.session.add(notification)
    db.session.commit()
    created_notif = Notification.query.filter_by(idNotification=notification.idNotification).first()
    return jsonify({'notification': created_notif.to_json()}), 201

@app.route('/api/notification/user', methods=['GET'])
def get_notification_for_user():
    if not 'token' in request.args:
        abort(400)
    user = User.verify_auth_token(request.args['token'])
    if user is None:
        abort(401)
    notifications = Notification.query.filter_by(userId=user.idUser, treated=False).all()
    return jsonify({'token': user.generate_auth_token(), 'notifications': [notif.to_json() for notif in notifications]}), 200

@app.route('/api/notification/update', methods=['PUT'])
def update_notif():
    if not request.json or not 'token' in request.json or not 'updater' in request.json:
        abort(400)
    user = User.verify_auth_token(request.json['token'])
    if user is None:
        abort(401)
    notifications = Notification.query.filter_by(updater=request.json['updater'], treated=False)
    for notif in notifications:
        notif.treated = True
    db.session.commit()
    return jsonify({'token': user.generate_auth_token(), 'updated_notifications': [notif.to_json() for notif in notifications]}), 200

