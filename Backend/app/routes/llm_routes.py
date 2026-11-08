from flask import request, Blueprint, jsonify
from app.llm_services import get_local_llm_response

local_llm_bp = Blueprint("local_llm", __name__)

@local_llm_bp.route("/<int:chat_id>", methods=["POST"])
def get_local_llm_reponse_route(chat_id):
    data = request.get_json()
    text_body = data.get("text_body")

    response = get_local_llm_response(chat_id, text_body)

    if response["success"]:
        return jsonify(response), 200
    else:
        return jsonify(response), 400