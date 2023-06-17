from flask import Flask, request, jsonify
from flask_cors import CORS
from ml_model import predict_email

app = Flask(__name__)
CORS(app)
print(predict_email)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    email = data['email']
    prediction = predict_email(email)  # Call the predict_email function
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
