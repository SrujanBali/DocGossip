from openai import OpenAI
from app import db
from app.models import Message, Chat_Session

local_client = OpenAI(
    base_url="http://host.docker.internal:11434/v1",
    api_key="ollama"
)

SUMMARY_TRIGGER_COUNT = 20

KEEP_RECENT_COUNT = 10

SYSTEM_PROMPT = (
    "You are DocGossip, a helpful assistant to help with document analysis and comprehension"
)

def make_response(success: bool, message: str, **kwargs) -> dict:
    response = {
        "success": success,
        "message": message
    }
    response.update(kwargs)
    return response

def build_summary_prompt(existing_summary: str | None, transcript: str) -> str:
    return f"""Update the conversation memory using the new lines below. Keep the output under 250 words and follow this exact format:

- **User Goal:** What the user is trying to accomplish.
- **Key Facts & Document Details:** Specific names, numbers, dates, quotes, or findings established so far.
- **Decisions & Answers Given:** Conclusions reached or solutions already provided.
- **Open Questions / Next Steps:** Unresolved items or what the user is working on next.

Existing Memory:
{existing_summary or "None"}

New Conversation Lines:
{transcript}
"""

def update_rolling_summary(chat):
    unsummarized = (
        Message.query.filter(Message.chat_id == chat.id, Message.id > (chat.last_summarized_msg_id or 0)).order_by(Message.id.asc()).all()
    )

    if len(unsummarized) <= SUMMARY_TRIGGER_COUNT:
        return

    to_summarize = unsummarized[:-KEEP_RECENT_COUNT]
    transcript = "\n".join(
        f"{'assistant' if m.is_ai else 'user'}: {m.text_body}" for m in to_summarize
    )

    prompt = build_summary_prompt(chat.summary, transcript)

    res = local_client.chat.completions.create(
        model="llama3.2",
        messages=[
            {"role": "system", "content": "You summarize chat histories accurately and concisely"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    chat.summary = res.choices[0].message.content.strip()
    chat.last_summarized_msg_id = to_summarize[-1].id
    db.session.commit()

def get_local_llm_response(chat_id, text_body):
    chat = db.session.get(Chat_Session, chat_id)
    if not chat:
        return make_response(False, "Couldn't find the chat session")

    user_message = Message(
        chat_id = chat_id,
        text_body = text_body,
        is_ai = False
    )
    try:
        system_content = SYSTEM_PROMPT
        if chat.summary: 
            system_content += f"\n\nConversation Memory Summary:\n{chat.summary}"

        recent_messages = (
            Message.query.filter(Message.chat_id == chat_id, Message.id > (chat.last_summarized_msg_id or 0)).order_by(Message.id.asc()).all()
        )

        messages = [{"role": "system", "content": system_content}]

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

        try:
            update_rolling_summary(chat)
        except Exception as e:
            db.session.rollback()
            print(f"Rolling summary update skipped: {e}")

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