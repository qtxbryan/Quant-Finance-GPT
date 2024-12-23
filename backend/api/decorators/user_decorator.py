from functools import wraps
from flask_jwt_extended import get_jwt_identity
from flask import jsonify
from api.models.user import UserModel

def fetch_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        user_email = get_jwt_identity()
        if not user_email:
            return jsonify({"message": "User email not found in JWT"}), 400
        user = UserModel.find_user_by_email(user_email)
        if not user:
            return jsonify({"message": "User not found"}), 404
        return func(user, *args, **kwargs)
    return wrapper
