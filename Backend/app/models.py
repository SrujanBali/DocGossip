from app import db

class Users(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    auth0_id = db.Column(db.String(128), unique=True, nullable=False)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    chat_sessions = db.relationship("Chat_Session", backref="user", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return{
            "id" : self.id,
            "auth0_id": self.auth0_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email
        }

class Chat_Session(db.Model):
    __tablename__ = "chat_sessions"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), default="New Chat")

    messages = db.relationship("Message", backref="chat_session", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title
        }

class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey("chat_sessions.id"), nullable=False)
    text_body = db.Column(db.Text, nullable=False)
    is_ai = db.Column(db.Boolean, default=False, nullable=False)

    def to_dict(self):
        return{
            "id": self.id,
            "chat_id": self.chat_id,
            "text_body": self.text_body,
            "is_ai": self.is_ai
        }