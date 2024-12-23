from api.extensions import mongo
import logging
from datetime import datetime
from bson.objectid import ObjectId

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

class GoalModel: 
    @classmethod
    def insert_goal_to_db(cls, goal):
        user_goals_collection = mongo.db.user_goals
        result = user_goals_collection.insert_one(goal)
        return result.inserted_id
    
    @classmethod
    def find_goals_by_user_id(cls, user_id):
        user_goals_collection = mongo.db.user_goals
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
        return list(user_goals_collection.find({"user_id": user_id}))
    
    @classmethod 
    def find_goal_by_id(cls, goal_id):
        user_goals_collection = mongo.db.user_goals
        if isinstance(goal_id, str):
            goal_id = ObjectId(goal_id)
        return user_goals_collection.find_one({"_id": goal_id, "state": {"$ne": "Deleted"}})

    @classmethod
    def update_goal(cls, goal_id, updated_goal):
        user_goals_collection = mongo.db.user_goals
        
        if isinstance(goal_id, str):
            goal_id = ObjectId(goal_id)
        
        updated_goal['updated_at'] = datetime.now()
        result = user_goals_collection.update_one(
            {"_id": goal_id}, 
            {"$set": updated_goal})
        return result.modified_count
        
