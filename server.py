from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="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",
)

SYSTEM_PROMPT = """You are a helpful blood donation assistant. Focus on:
- Blood donation eligibility requirements
- Donation process information
- Benefits of blood donation
- Common misconceptions
- Emergency blood needs
Keep responses concise and informative."""

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')
        if not user_message:
            return jsonify({"error": "No message provided"}), 400
        
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Blood Donation Assistant",
            },
            model="deepseek/deepseek-r1-zero:free",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ]
        )
        
        response_message = completion.choices[0].message.content
        return jsonify({"response": response_message})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)