from flask import request, Blueprint, jsonify
from app.llm_services import get_local_llm_response

local_llm_bp = Blueprint("local_llm", __name__)

@local_llm_bp.route("/", methods=["POST"])
def get_local_llm_reponse_route():
    data = request.get_json()

    user_message = data.get("user_message")

    response = get_local_llm_response(user_message)

    if response["success"]:
        return jsonify(response), 200
    else:
        return jsonify(response), 400