from flask import Blueprint, request, jsonify, g
from app.database_services import create_chat_session,update_chat_session, delete_chat_session, get_chat_session_by_id
from app.auth import require_auth
from app.models import Users

session_bp = Blueprint("sessions", __name__)

@session_bp.route("/", methods=["POST"])
@require_auth
def create_chat_session_route():
    data = request.get_json()
    title = data.get("title")

    user = Users.query.filter_by(auth0_id = g.auth0_id).first()
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    result = create_chat_session(user.id, title)

    if result["success"]:
        return jsonify(result), 201
    else:
        return jsonify(result), 400

@session_bp.route("/", methods=["GET"])
@require_auth
def get_chat_session_by_id_route():
    print(g.auth0_id)
    user = Users.query.filter_by(auth0_id=g.auth0_id).first()
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    result = get_chat_session_by_id(user.id)

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400


@session_bp.route("/<int:id>", methods=["PUT"])
@require_auth
def update_chat_session_route(id):
    data = request.get_json()
    title = data.get("title")

    user = Users.query.filter_by(auth0_id = g.auth0_id).first()
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    result = update_chat_session(id, title, user.id)

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400


@session_bp.route("/<int:id>", methods=["DELETE"])
@require_auth
def delete_chat_session_route(id):
    user = Users.query.filter_by(auth0_id = g.auth0_id).first()
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    result = delete_chat_session(id, user.id)

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400
