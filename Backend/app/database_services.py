from app.models import Users, Chat_Session, Message
from app import db

def make_response(success: bool, message: str, **kwargs) -> dict:
    response = {
        "success": success,
        "message": message
    }
    response.update(kwargs)
    return response

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

        return make_response(True, "User created successfully", user_id=new_user.id)

    except Exception as e:
        db.session.rollback()

        return make_response(False, f"Error occured while creating user : {e}")

def get_all_users():
    try:
        users = Users.query.all()
        users_dict = [user.to_dict() for user in users]

        return make_response(True, "Fetched all users", users=users_dict)

    except Exception as e:
        return make_response(False, f"Error while fetching users: {e}")

def delete_user(id):
    user = Users.query.get(id)
    if user:
        try:
            db.session.delete(user)
            db.session.commit()
            return make_response(True, "User succesfully deleted", deleted_user_id=id)
        except Exception as e:
            db.session.rollback()
            return make_response(False, f"Error occured while deleting user: {e}")
        
    else:
        return make_response(False, f"No user with the id {id} found in the database")


def create_new_message(chat_id, text_body, is_ai=False):
    try:
        new_message = Message(
            chat_id = chat_id,
            text_body = text_body,
            is_ai = is_ai
        )

        db.session.add(new_message)
        db.session.commit()

        return make_response(True, "New message Created", message_id=new_message.id, is_ai=new_message.is_ai)

    except Exception as e:
        db.session.rollback()
        return make_response(False, f"Error while creating message: {e}")


def get_messages():
    try:
        messages = Message.query.all()
        messages_dict = [message.to_dict() for message in messages]

        return make_response(True, "Fetched all messages", messages=messages_dict)

    except Exception as e:
        return make_response(False, f"Error while fetching messages: {e}")

def get_messages_by_chat(chat_id):
    try:
        messages = Message.query.filter_by(chat_id = chat_id).all()
        messages_dict = [message.to_dict() for message in messages]

        return make_response(True, f"Messages for chat id {chat_id} fetched.", messages=messages_dict)
    except Exception as e:
        return make_response(False, f"Error occured while fetching messages : {e}")
    

def create_chat_session(user_id, title="New Chat"):
    try:
        new_chat_session = Chat_Session(
            user_id = user_id,
            title = title
        )

        db.session.add(new_chat_session)
        db.session.commit()

        return make_response(True, "New chat session created", chat_session_id=new_chat_session.id)
    
    except Exception as e:
        db.session.rollback()
        return make_response(False, f"Error while creating chat session: {e}")

def get_chat_sessions():
    try:
        chat_sessions = Chat_Session.query.all()
        chat_sessions_dict = [chat_session.to_dict() for chat_session in chat_sessions]

        return make_response(True, "Fetched all chat sessions", chat_sessions=chat_sessions_dict)
    except Exception as e:
        return make_response(False, f"Error while fetching chat sessions: {e}")

def update_chat_session(id, title):
    chat_session = Chat_Session.query.get(id)
    if chat_session:
        try:
            chat_session.title = title
            db.session.commit()
            return make_response(True, "Chat Session title updated", chat_session_id = chat_session.id, new_title=title)
        except Exception as e:
            db.session.rollback()
            return make_response(False, f"Error occured while updating chat session title: {e}")
        
    else:
        return make_response(False, f"No chat session with the id {id} found in the database")

def delete_chat_session(id):
    chat_session = Chat_Session.query.get(id)
    if chat_session:
        try:
            db.session.delete(chat_session)
            db.session.commit()
            return make_response(True, "Chat session successfully deleted", deleted_chat_session_id=id)
        except Exception as e:
            db.session.rollback()
            return make_response(False, f"Error occured while deleting chat session: {e}")
        
    else:
        return make_response(False, f"No chat session with the id {id} found in the database")
