from flask import Blueprint, request, jsonify, g
from app.database_services import create_new_message, get_messages, get_messages_by_chat
from app.auth import require_auth
from app.models import Users, Chat_Session

messages_bp = Blueprint("messages", __name__)

@messages_bp.route("/<int:chat_id>", methods=["GET"])
@require_auth
def get_messages_by_chat_route(chat_id):
    user = Users.query.filter_by(auth0_id = g.auth0_id).first()
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    chat = Chat_Session.query.filter_by(id=chat_id, user_id=user.id).first()
    if not chat:
        return jsonify({"success": False, "message": "Chat not found"}), 404

    result = get_messages_by_chat(chat_id)

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 404

