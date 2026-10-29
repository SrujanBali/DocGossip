from flask import Flask, jsonify, request
from app.models import Users, Chat_Session, Message
from app.app import db

def create_user(first_name: str, last_name: str, username, email):
    try:
        new_user = Users(
            first_name = first_name,
            last_name = last_name,
            username = username,
            email = email,
        )

        db.session.add(new_user)
        db.session.commit()

        return {"success": True, "message": "User created successfullly", "user_id": new_user.id}

    except Exception as e:
        db.session.rollback()

        return {"success": False, "message": f"Error occured while creating user : {e}"}

def get_all_users():
    try:
        users = Users.query.all()
        users_dict = [user.to_dict() for user in users]

        return {"success": True, "message" : "Fetched all users", "users": users_dict}

    except Exception as e:
        return {"success": False, "message": f"Error occured whiile fetching users: {e}"}