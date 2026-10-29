from flask import Blueprint, request, jsonify
from app.database_services import *

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

@api_bp.route("/delete_user", methods=["POST"])
def delete_user_route():
    data = request.get_json()

    id = data.get("user_id")

    result = delete_user(id)
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400

@api_bp.route("/create_message", methods=["POST"])
def create_new_message_route():
    data = request.get_json()

    chat_id = data.get("chat_id")
    text_body = data.get("text_body")
    is_ai = data.get("is_ai")

    result = create_new_message(chat_id, text_body, is_ai)
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400

@api_bp.route("/messages", methods=["GET"])
def get_messages_route():
    messages = get_messages()

    if messages["success"]:
        return jsonify(messages)
    else:
        return jsonify(messages)

@api_bp.route("/create_chat_session", methods=["POST"])
def create_chat_session_route():
    data = request.get_json()

    user_id = data.get("user_id")
    title = data.get("title")

    result = create_chat_session(user_id, title)

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400

@api_bp.route("/update_chat_session", methods=["POST"])
def update_chat_session_route():
    data = request.get_json()

    id = data.get("id")
    title = data.get("title")

    result = update_chat_session(id, title)

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400

@api_bp.route("/delete_chat_session", methods=["POST"])
def delete_chat_session_route():
    data = request.get_json()

    id = data.get("id")

    result = delete_chat_session(id)

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400
