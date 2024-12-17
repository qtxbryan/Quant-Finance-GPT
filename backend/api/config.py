# config.py
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY') or 'your_default_secret_key'
    MONGO_URI = os.getenv('MONGO_URI') or 'mongodb://localhost:27017/flask_auth_db'
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY') or 'your_jwt_secret_key'
    BCRYPT_LOG_ROUNDS = int(os.getenv('BCRYPT_LOG_ROUNDS', 12))
    MONGO_DBNAME = "quantfyp"
    FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')
