from openai import OpenAI

local_client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

def make_response(success: bool, message: str, **kwargs) -> dict:
    response = {
        "success": success,
        "message": message
    }
    response.update(kwargs)
    return response

def get_local_llm_response(user_message):
    try:
        response = local_client.chat.completions.create(
            model="llama3.2",
            messages=[
                {"role": "system", "content" : "You are DocGossip, a helpful assistant to help with document analysis and comprehension"},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7
        )
        return make_response(True, "LLM response fetched", response=response.choices[0].message.content)
    except Exception as e:
        return make_response(False, f"Error while connecting or fetching resposne from local LLM : {e}", response="Sorry! Couldnt reach the Local LLM. Check if Ollma is running and is configured correctly.")


# if __name__ == "__main__":
#     user_input = input("Enter your test question:- ")
#     while user_input != "byebye":
#         ai_response = get_local_llm_response(user_input)
#         print(f"AI Response \n {ai_response}")
#         user_input = input("Enter your next question:- ")