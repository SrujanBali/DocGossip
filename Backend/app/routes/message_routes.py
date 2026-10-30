from flask import Blueprint, request, jsonify
from app.database_services import create_new_message, get_messages, get_messages_by_chat
messages_bp = Blueprint("messages", __name__)

@messages_bp.route("", methods=["POST"])
def create_new_message_route():
    data = request.get_json()

    chat_id = data.get("chat_id")
    text_body = data.get("text_body")
    is_ai = data.get("is_ai")

    result = create_new_message(chat_id, text_body, is_ai)
    if result["success"]:
        return jsonify(result), 201
    else:
        return jsonify(result), 400

@messages_bp.route("", methods=["GET"])
def get_messages_route():
    messages = get_messages()

    if messages["success"]:
        return jsonify(messages), 200
    else:
        return jsonify(messages), 500

@messages_bp.route("/<int:chat_id>", methods=["GET"])
def get_messages_by_chat_route(chat_id):
    result = get_messages_by_chat(chat_id)

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 404

