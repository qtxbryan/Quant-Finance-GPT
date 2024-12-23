from api.extensions import mongo, bcrypt
from bson.objectid import ObjectId

class UserModel:
    @classmethod
    def create_user(cls, email, password):
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = {"email": email, "password": hashed_password}
        # Now that mongo is initialized with the app, mongo.db should not be None
        mongo.db.users.insert_one(user)

    @classmethod
    def find_by_id(cls, user_id):
        users_collection = mongo.db.users
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
        return users_collection.find_one({"_id": user_id})
    
    @classmethod
    def find_user_by_email(cls, email):
        return mongo.db.users.find_one({"email": email})
    
    @classmethod
    def update_user_onboarding(cls, email, name, age, income, savings, expenses, debt, risk_tolerance):
        mongo.db.users.update_one(
            {"email": email}, 
            {"$set": 
                {
                    "name": name, 
                    "age": age, 
                    "income": income, 
                    "savings": savings, 
                    "expenses": expenses,
                    "debts": debt,
                    "risk_tolerance": risk_tolerance
                }})
        
    @classmethod
    def find_user_by_id(cls, user_id):
        try:
            return mongo.db.users.find_one({"_id": ObjectId(user_id)})
        except Exception as e:
            print(f"Invalid user ID format: {e}")
            return None