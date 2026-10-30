import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("MY_SQL_CONNECTION_STRING")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    with app.app_context():
        from Backend.app import models
        db.create_all()

    from app.routes.user_routes import users_bp
    from app.routes.message_routes import messages_bp
    from app.routes.chat_session_routes import session_bp

    app.register_blueprint(users_bp, url_prefix="/users")
    app.register_blueprint(messages_bp, url_prefix="/messages")
    app.register_blueprint(session_bp, url_prefix="/sessions")

    return app

