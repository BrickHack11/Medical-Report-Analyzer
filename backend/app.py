from flask import Flask, jsonify, request, send_from_directory, abort
from flask_cors import CORS
from pymongo import MongoClient
import os
from openai import OpenAI
import pytesseract
import pdfplumber
from PIL import Image

from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
CORS(app)  


UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")  # Ensure absolute path
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# MongoDB Connection
MONGO_URI = os.getenv("MONGODB_URI")  

client = MongoClient(MONGO_URI)

db = client["BRICKHACKDB"]

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text_from_image(image_path):
    """Extracts text from an image using Tesseract OCR."""
    text = pytesseract.image_to_string(Image.open(image_path))
    return text.strip()

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text.strip()

def analyze_health_report(text):
    prompt = f"""
    The following is a medical test report:
    {text}

   You have been a medical nurse for more than 10 years and have been serving in the medical sector helping people understand their medical report in a 
   clear and a concise language. You will be given a medical report to analyze and summarize. Your task is to read the entire report find the most important 
   information as well as explain the report to me like explaining to a 10 year old child. also mention some details about the user at the start. Make sure to explain everything
   in bullet points. Also, suggest foods or lifestyle changes the patient should adopt to improve their health.
   After every meaningful sentence write GOINGTONEXT word to differentiate next point.
    """

    response = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": "You are a medical assistant that simplifies health reports for normal people."},
                  {"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content.strip()


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Server is running!"})

@app.route("/try", methods=["GET"])
def home2():
    # Ask GPT for the capital of India
    response = openai_client.chat.completions.create(
        model="gpt-4o",  # Use the GPT-3.5-turbo model
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "What is the capital of Japan?"}
        ],
        max_tokens=50
    )
    
    # Extract the answer from the response
    answer = response.choices[0].message.content.strip()
    
    # Return the answer as a JSON response
    return jsonify({"answer": answer})


@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = file.filename
    file_path = os.path.join("uploads", filename)
    file.save(file_path)

    # Determine if it's a PDF or an Image
    if filename.endswith(".pdf"):
        extracted_text = extract_text_from_pdf(file_path)
    else:
        extracted_text = extract_text_from_image(file_path)

    # Use GPT to analyze health data
    analysis = analyze_health_report(extracted_text)

    analysis_list = [sentence.strip() for sentence in analysis.split("GOINGTONEXT") if sentence.strip()]

    return jsonify({"analysis_report": analysis_list})



@app.route("/insert", methods=["POST"])
def insert_report():
    try:
        data = request.json  # Get JSON request data

        # Validate input fields
        required_fields = ["user_email", "date_added", "file_name","analysis_report"]
        if not all(key in data for key in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        if not isinstance(data["analysis_report"], list):  # Ensure 'analysis_report' is a list
            return jsonify({"error": "'analysis_report' must be a list"}), 400

        # Insert data into MongoDB
        collection = db["reports"]  # Using a 'reports' collection
        insert_result = collection.insert_one(data)

        return jsonify({"message": "Report inserted successfully", "inserted_id": str(insert_result.inserted_id)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500




from datetime import datetime

@app.route("/fetch_reports", methods=["POST"])
def fetch_reports():
    try:
        data = request.json  # Get JSON request data

        # Validate input
        if "user_email" not in data:
            return jsonify({"error": "Missing required field: user_email"}), 400

        user_email = data["user_email"]

        # Fetch reports from MongoDB sorted by date_added (latest first)
        collection = db["reports"]
        reports = list(collection.find({"user_email": user_email}).sort("date_added", -1))

        # Convert ObjectId to string and format the response
        for report in reports:
            report["_id"] = str(report["_id"])  # Convert ObjectId to string
            if "date_added" in report:
                report["date_added"] = report["date_added"]  # Keeping it as a string

        return jsonify({"reports": reports}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500






# Route to serve uploaded files
@app.route("/uploads/<path:filename>")
def serve_uploaded_file(filename):
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

    if not os.path.exists(file_path):
        print(f"🚨 ERROR: File Not Found -> {file_path}")  # Debugging log
        return abort(404)  # Return 404 if file does not exist

    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)



@app.route("/translate", methods=["POST"])
def translate_report():
    try:
        data = request.json

        # Validate input fields
        if "translate_to" not in data or "analysis_report" not in data:
            return jsonify({"error": "Missing required fields"}), 400

        target_language = data["translate_to"]
        analysis_report = data["analysis_report"]

        if not isinstance(analysis_report, list):
            return jsonify({"error": "'analysis_report' must be a list"}), 400

        # Construct the prompt for translation
        prompt = f"""
        Translate the following medical report into {target_language}:

        {chr(10).join(analysis_report)}

        Ensure the translation is accurate and maintains the medical terminology. Keep the format intact.
        """

        response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "You are a professional medical translator."},
                      {"role": "user", "content": prompt}]
        )

        translated_text = response.choices[0].message.content.strip().split("\n")

        return jsonify({"translated_report": translated_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500






if __name__ == "__main__":
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(debug=True)