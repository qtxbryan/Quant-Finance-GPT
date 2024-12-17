from flask_jwt_extended import create_access_token
from api.models.user import UserModel, bcrypt

class AuthService:
    @staticmethod
    def register_user(email, password):
        if UserModel.find_user_by_email(email):
            return {"message": "User already exists"}, 409
        UserModel.create_user(email, password)
        return {"message": "User registered successfully"}, 201

    @staticmethod
    def login_user(email, password):
        user = UserModel.find_user_by_email(email)
        if not user or not bcrypt.check_password_hash(user['password'], password):
            return {"message": "Invalid credentials"}, 401
        access_token = create_access_token(identity=email)
        return {"access_token": access_token}, 200
