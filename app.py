from flask import Flask, request, jsonify
import openai  

app = Flask(__name__)

OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"
openai.api_key = OPENAI_API_KEY

active_sessions = {}

@app.route("/activate", methods=["POST"])
def activate():
    user_id = request.json.get("user_id")
    active_sessions[user_id] = True
    return jsonify({"status": "activated"})
@app.route("/deactivate", methods=["POST"])
def deactivate():
    user_id = request.json.get("user_id")
    active_sessions.pop(user_id, None)
    return jsonify({"status": "deactivated"})
@app.route("/ask", methods=["POST"])
def ask_gpt():
    user_id = request.json.get("user_id")
    if not active_sessions.get(user_id):
        return jsonify({"error": "Session not active"}), 403
    question = request.json.get("question")
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": question}]
    )
    return jsonify({"answer": response["choices"][0]["message"]["content"]})
if __name__ == "__main__":
    app.run(debug=True)