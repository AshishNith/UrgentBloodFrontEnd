from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_ollama import OllamaLLM

app = Flask(__name__)
CORS(app)

model = OllamaLLM(model="llama3")

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        # Create a simple prompt for blood donation related queries
        prompt = f"""
        You are a helpful blood donation assistant. Answer the following question:
        {user_message}
        """
        
        # Get response from LangChain
        response = model.invoke(prompt)
        
        print(f"User message: {user_message}")
        print(f"Bot response: {response}")

        return jsonify({
            "response": str(response),
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