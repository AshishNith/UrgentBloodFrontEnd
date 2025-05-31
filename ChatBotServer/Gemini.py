from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Configure Gemini API
api_key = "AIzaSyAW59-5erJytu4T33KgHUpBfhs3ExmsSQ8"
genai.configure(api_key=api_key)

# Initialize the model
model = genai.GenerativeModel('gemini-1.5-pro-latest')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        # Create a blood donation specific prompt
        prompt = f"""You are a helpful blood donation assistant. 
        Your role is to provide accurate information about blood donation, eligibility, 
        and address concerns about the donation process.
        
        User Question: {user_message}
        
        Please provide a clear and concise response."""

        # Generate response from Gemini
        response = model.generate_content(prompt)
        print(f"User message: {user_message}")
        print(f"Bot response: {response.text}")

        return jsonify({
            "response": response.text,
            "status": "success"
        })
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)