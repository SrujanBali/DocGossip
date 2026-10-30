from flask import Blueprint, request, jsonify
from app.database_services import create_user, get_all_users, delete_user

users_bp = Blueprint("users", __name__)

@users_bp.route("", methods=["POST"])
def add_user_route():
    data = request.get_json()

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    username = data.get("username")
    email = data.get("email")

    result = create_user(first_name, last_name, username, email)

    if result["success"]:
        return jsonify(result), 201
    else:
        return jsonify(result), 400

@users_bp.route("", methods=["GET"])
def get_all_users_route():
    users = get_all_users()

    if users["success"]:
        return jsonify(users), 200
    else:
        return jsonify(users), 500

@users_bp.route("/<int:user_id>", methods=["DELETE"])
def delete_user_route(user_id):
    result = delete_user(user_id)
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 404