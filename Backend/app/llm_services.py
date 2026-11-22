from openai import OpenAI
from app import db
from app.models import Message

local_client = OpenAI(
    base_url="http://host.docker.internal:11434/v1",
    api_key="ollama"
)

SYSTEM_PROMPT = (
    "You are DocGossip, a helpful assitant to help with document analysis and comprehension"
)

MAX_HISTORY_MESSAGES = 20

def make_response(success: bool, message: str, **kwargs) -> dict:
    response = {
        "success": success,
        "message": message
    }
    response.update(kwargs)
    return response

def get_local_llm_response(chat_id, text_body):
    user_message = Message(
        chat_id = chat_id,
        text_body = text_body,
        is_ai = False
    )
    try:
        recent_messages = (
            Message.query.filter_by(chat_id = chat_id).order_by(Message.id.desc()).limit(MAX_HISTORY_MESSAGES).all()
        )
        recent_messages.reverse()

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for msg in recent_messages:
            messages.append({
                "role": "assistant" if msg.is_ai else "user",
                "content": msg.text_body
            })

        messages.append({"role": "user", "content": text_body})

        response = local_client.chat.completions.create(
            model="llama3.2",
            messages=messages,
            temperature=0.5
        )
        llm_text = response.choices[0].message.content

        llm_message = Message(
            chat_id = chat_id,
            text_body = llm_text,
            is_ai = True
        )

        db.session.add(user_message)
        db.session.add(llm_message)

        db.session.commit()

        db.session.refresh(user_message)
        db.session.refresh(llm_message)

        return make_response(True, "Reponse created and saved", llm_message = llm_message.to_dict(), user_message = user_message.to_dict())

    except Exception as e:
        db.session.rollback()
        return make_response(False, f"Error while connecting or fetching resposne from local LLM : {e}", error_detail="Sorry! Couldn't reach the Local LLM. Check if Ollama is running and is configured correctly.")


# if __name__ == "__main__":
#     user_input = input("Enter your test question:- ")
#     while user_input != "byebye":
#         ai_response = get_local_llm_response(user_input)
#         print(f"AI Response \n {ai_response}")
#         user_input = input("Enter your next question:- ")