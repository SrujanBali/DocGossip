from flask import Blueprint, request, jsonify
from app.database_services import create_user, get_all_users, get_user

api_bp = Blueprint("api", __name__)

@api_bp.route("/add_user", methods=["POST"])
def add_user_route():
    data = request.get_json()

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    username = data.get("username")
    email = data.get("email")

    result = create_user(first_name, last_name, email, username)

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400

@api_bp.route("/users", methods={"GET"})
def get_all_users_route():
    users = get_all_users()

    if users["success"]:
        return jsonify(users), 200
    else:
        return jsonify(users), 400

@api_bp.route("/get_user", methods=["POST"])
def get_user_route():
    data = request.get_json

    username = data.get("username")

    result = get_user(username)
    
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400
