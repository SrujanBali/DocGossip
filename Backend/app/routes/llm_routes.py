from flask import request, Blueprint, jsonify, g
from app.llm_services import get_local_llm_response
from app.auth import require_auth
from app.models import Users, Chat_Session

local_llm_bp = Blueprint("local_llm", __name__)

@local_llm_bp.route("/<int:chat_id>", methods=["POST"])
@require_auth
def get_local_llm_reponse_route(chat_id):
    data = request.get_json()
    text_body = data.get("text_body")

    user = Users.query.filter_by(auth0_id = g.auth0_id).first()
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404
    chat = Chat_Session.query.filter_by(id=chat_id, user_id=user.id).first()
    if not chat:
        return jsonify({"success": False, "message": "Chat not found"}), 404

    response = get_local_llm_response(chat_id, text_body)

    if response["success"]:
        return jsonify(response), 200
    else:
        return jsonify(response), 400