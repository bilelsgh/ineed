import os
from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from datetime import date
import bcrypt
from models import *

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



if __name__ == '__main__':
    app.run(debug=1)
