"""
Flask backend for Quran & Hadith AI Chat
Handles OpenAI API calls and Quran data processing
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok"})

@app.route('/chat', methods=['POST'])
def chat():
    """
    Handle chat requests using OpenAI API
    """
    try:
        data = request.get_json()
        
        if not data or not data.get('apiKey'):
            return jsonify({"error": "API Key is required"}), 400
        
        user_query = data.get('userQuery')
        language = data.get('language', 'de')
        api_key = data.get('apiKey')
        
        if not user_query:
            return jsonify({"error": "User query is required"}), 400
        
        # Set OpenAI API key
        openai.api_key = api_key
        
        # Create system prompt
        if language == 'de':
            system_prompt = """Sie sind ein hilfreicher KI-Assistent, der Fragen zum Koran und den Hadithen beantwortet.
Beantworten Sie Fragen auf Deutsch.
Seien Sie respektvoll und informativ.
Zitieren Sie relevante Verse oder Hadithe, wenn möglich."""
        else:
            system_prompt = """You are a helpful AI assistant that answers questions about the Quran and Hadith.
Answer questions in English.
Be respectful and informative.
Cite relevant verses or Hadith when possible."""
        
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_query}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        generated_answer = response.choices[0].message.content
        
        return jsonify({
            "generatedAnswer": generated_answer,
            "sources": [
                {
                    "type": "quran",
                    "reference": "OpenAI GPT-3.5",
                    "text": generated_answer
                }
            ]
        })
    
    except openai.error.AuthenticationError:
        return jsonify({"error": "Invalid API Key"}), 401
    except openai.error.RateLimitError:
        return jsonify({"error": "Rate limit exceeded"}), 429
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=False)
