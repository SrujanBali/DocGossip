from flask import Blueprint, request, jsonify
from app.database_services import create_chat_session, update_chat_session, delete_chat_session

session_bp = Blueprint("sessions", __name__)

@session_bp.route("", methods=["POST"])
def create_chat_session_route():
    data = request.get_json()

    user_id = data.get("user_id")
    title = data.get("title")

    result = create_chat_session(user_id, title)

    if result["success"]:
        return jsonify(result), 201
    else:
        return jsonify(result), 400

@session_bp.route("/<int:id>", methods=["PUT"])
def update_chat_session_route(id):
    data = request.get_json()
    title = data.get("title")

    result = update_chat_session(id, title)

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400

@session_bp.route("<int:id>", methods=["DELETE"])
def delete_chat_session_route(id):
    result = delete_chat_session(id)

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400
