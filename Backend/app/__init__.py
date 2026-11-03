import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("MY_SQL_CONNECTION_STRING")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    with app.app_context():
        from app import models
        db.create_all()

    from app.routes.user_routes import users_bp
    from app.routes.message_routes import messages_bp
    from app.routes.chat_session_routes import session_bp
    from app.routes.llm_routes import local_llm_bp

    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(messages_bp, url_prefix="/api/messages")
    app.register_blueprint(session_bp, url_prefix="/api/sessions")
    app.register_blueprint(local_llm_bp, url_prefix="/api/local_llm")

    return app

