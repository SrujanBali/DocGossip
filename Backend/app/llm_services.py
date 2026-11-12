from openai import OpenAI
from app import db
from app.models import Message

local_client = OpenAI(
    base_url="http://host.docker.internal:11434/v1",
    api_key="ollama"
)

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
        response = local_client.chat.completions.create(
            model="llama3.2",
            messages=[
                {"role": "system", "content" : "You are DocGossip, a helpful assistant to help with document analysis and comprehension"},
                {"role": "user", "content": text_body}
            ],
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