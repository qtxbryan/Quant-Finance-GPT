from flask import request 
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token, jwt_required
from api.models.user import UserModel, bcrypt

ns = Namespace('auth', description="Authentication APIs")

user_model = ns.model('User', {
    'email': fields.String(required=True, description='Email'),
    'password': fields.String(required=True, description='Password')
})

@ns.route('/register')
class RegisterResource(Resource):
    @ns.expect(user_model, validate=True)
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        existing_user = UserModel.find_user_by_email(email)
        if existing_user:
            return {'message': 'User already exists'}, 400
        
        UserModel.create_user(email, password)
        
        # Create JWT token
        access_token = create_access_token(identity=email)
        return {'access_token': access_token}, 200

@ns.route('/login')
class LoginResource(Resource):
    @ns.expect(user_model, validate=True)
    def post(self):
        """Login and return a JWT token."""
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = UserModel.find_user_by_email(email)
        if not user:
            return {'message': 'Invalid email or password.'}, 401

        # Check password using bcrypt
        if not bcrypt.check_password_hash(user['password'], password):
            return {'message': 'Invalid email or password.'}, 401

        # Create JWT token
        access_token = create_access_token(identity=email)
        return {'access_token': access_token}, 200
    
