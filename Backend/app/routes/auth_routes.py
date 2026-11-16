from flask import Blueprint, request, jsonify, g
from app import db
from app.auth import require_auth
from app.models import Users

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/", methods=["POST"])
@require_auth
def sync_user():
    data = request.get_json() or {}

    auth0_id = g.auth0_id
    email = data.get("email")
    name = data.get("name", "").split(" ")
    first_name = name[0] if len(name) > 0 else ""
    last_name = name[1] if len(name) > 1 else ""
    email_prefix = email.split("@")[0] if email and "@" in email else "user"
    base_username = data.get("nickname") or email_prefix

    user = Users.query.filter_by(auth0_id=auth0_id).first() 

    if not user and email:
        user = Users.query.filter_by(email = email).first()

    if user:
        user.auth0_id = auth0_id
        if email:
            user.email = email
        db.session.commit()
    else:
        username = base_username
        counter = 1
        while Users.query.filter_by(username=username).first():
            username = f"{base_username}{counter}"
            counter += 1

        user = Users(
            auth0_id =  auth0_id,
            email = email,
            first_name = first_name,
            last_name = last_name,
            username=username
        )
        db.session.add(user)
        db.session.commit()

    return jsonify({
        "message": "User synchronized successfully",
        "user": user.to_dict()
    }), 200