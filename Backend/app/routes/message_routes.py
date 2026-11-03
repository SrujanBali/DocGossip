from flask import Blueprint, request, jsonify
from app.database_services import create_new_message, get_messages, get_messages_by_chat
messages_bp = Blueprint("messages", __name__)

@messages_bp.route("/", methods=["GET"])
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

