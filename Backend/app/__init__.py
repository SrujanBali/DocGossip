import os
import time
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.exc import OperationalError
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("MY_SQL_CONNECTION_STRING")

    db.init_app(app)

    with app.app_context():
        from app import models

        max_retries = 10
        retry_interval = 3

        for attempt in range(max_retries):
            try:
                db.create_all()
                print("Database connected and tables created successfully")
                break
            except OperationalError as e:
                if attempt < max_retries -1:
                    print(f'Database not ready yet (attempt {attempt + 1}/{max_retries}). Retrying in {retry_interval}')
                    time.sleep(retry_interval)
                else:
                    print("Coudnt connect to the database, max retries reached")
                    raise e

    from app.routes.user_routes import users_bp
    from app.routes.message_routes import messages_bp
    from app.routes.chat_session_routes import session_bp
    from app.routes.llm_routes import local_llm_bp

    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(messages_bp, url_prefix="/api/messages")
    app.register_blueprint(session_bp, url_prefix="/api/sessions")
    app.register_blueprint(local_llm_bp, url_prefix="/api/local_llm")

    return app

