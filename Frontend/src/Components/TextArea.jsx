import "../app.css"

function TextArea() {
    const messages = [
    {"chat_id": 1, "text_body": "Hey DocGossip, can you help me set up a Flask Blueprint for my new project?", "is_ai": false},
    {"chat_id": 1, "text_body": "I'd be happy to help! Flask Blueprints are great for organizing routes into modular files. What part are you setting up first?", "is_ai": true},
    {"chat_id": 1, "text_body": "I'm trying to register an auth blueprint in my main `__init__.py` file.", "is_ai": false},
    {"chat_id": 1, "text_body": "Make sure you use `app.register_blueprint(auth_bp, url_prefix='/auth')` after initializing your Flask app instance.", "is_ai": true},
    {"chat_id": 1, "text_body": "Got it! Next, I need to configure Tailwind CSS v4. Any tips on the CSS import syntax?", "is_ai": false},
    {"chat_id": 1, "text_body": "In Tailwind v4, you typically import it using `@import 'tailwindcss';` right at the top of your main CSS file.", "is_ai": true},
    {"chat_id": 1, "text_body": "Awesome. Also, how do I handle custom font families like Passero One?", "is_ai": false},
    {"chat_id": 1, "text_body": "You can define custom theme variables using `@theme` blocks directly in your CSS file alongside your Tailwind import.", "is_ai": true},
    {"chat_id": 1, "text_body": "That's super clean. Let's talk about the database model. I'm using MySQL with Flask-SQLAlchemy.", "is_ai": false},
    {"chat_id": 1, "text_body": "MySQL works great for persistent storage, especially with foreign key relationships linking users to chat sessions and messages.", "is_ai": true},
    {"chat_id": 1, "text_body": "Right, exactly like the `Message` model with `chat_id` and `is_ai` boolean fields.", "is_ai": false},
    {"chat_id": 1, "text_body": "Spot on. That boolean flag makes it really easy to separate user speech bubbles from AI responses on the frontend.", "is_ai": true},
    {"chat_id": 1, "text_body": "Speaking of frontend, I just fixed my sidebar overflow using a native flexbox layout instead of absolute positioning.", "is_ai": false},
    {"chat_id": 1, "text_body": "That's a huge win! Using `flex-1` on your text screen ensures the content container automatically shrinks or expands when the sidebar toggles.", "is_ai": true},
    {"chat_id": 1, "text_body": "Yeah, no more weird content-shifting or horizontal scrollbars.", "is_ai": false},
    {"chat_id": 1, "text_body": "Flexbox is fantastic for building responsive playbook-style dashboards like DocGossip.", "is_ai": true},
    {"chat_id": 1, "text_body": "Next up, I'm going to wire up a local LLM runner via an OpenAI-compatible API endpoint.", "is_ai": false},
    {"chat_id": 1, "text_body": "Ollama or LM Studio will work wonderfully for that since they expose standard `/v1/chat/completions` routes.", "is_ai": true},
    {"chat_id": 1, "text_body": "Exactly. I'll pass a dynamic `base_url` in my Python backend client config.", "is_ai": false},
    {"chat_id": 1, "text_body": "You're all set then! Let me know if you run into any issues testing out the message feed scrolling with these dummy entries.", "is_ai": true}
    ]
  return (
    <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="flex flex-col space-y-4 py-10 gap-7">
        {messages.map((msg, index) => {
            const isMe =  !msg.is_ai
            return (
                <div key={msg.chat_id || index} className={`flex flex-col ${isMe ? "items-end" : "items-start"} `}>
                    <div className={`max-w-[70%] rounded-lg wrap-break-word  text-[25px] py-4 px-2 ${isMe ? "bg-blue-300" : ""}`}><p>{msg.text_body}</p></div>  
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default TextArea