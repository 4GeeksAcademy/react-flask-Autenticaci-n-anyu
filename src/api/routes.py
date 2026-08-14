"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, resources={r"/*": {"origins": "*"}}, allow_headers=["Content-Type", "Authorization"])


@ api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body={
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@ api.route('/signup', methods=['POST'])
def signup():
    body=request.get_json()

    email=body.get("email")
    password=body.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    existing_user=db.session.execute(
        db.select(User).where(User.email == email)
    ). scalar_one_or_none()

    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    new_user=User(
        email=email,
        password=generate_password_hash(password),
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User created successfully",
        "user": new_user.serialize()
    }), 201

@ api.route('/login', methods=['POST'])
def login():
    body=request.get_json()

    email=body.get("email")
    password=body.get("password")

    user=db.session.execute(
        db.select(User).where(User.email == email)
    ).scalar_one_or_none()

    if not user:
        return jsonify({"message": "Invalid email or password"}), 401
    if not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401

    access_token=create_access_token(identity=str(user.id))

    return jsonify({
        "token": access_token,
        "user": user.serialize()
    }), 200

@ api.route('/private', methods=['GET'])
@ jwt_required()
def private():
    current_user_id=get_jwt_identity()
    user=db.session.get(User, int(current_user_id))

    return jsonify({
        "message": "welcome to the private area",
        "user": user.serialize()
    }), 200
