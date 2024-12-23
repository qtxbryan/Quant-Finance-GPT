import logging
from api.models.goal import GoalModel
from api.models.user import UserModel
from api.decorators.user_decorator import fetch_user
from api.utils.chatgpt import get_advisory_recommendation
from flask import jsonify

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

def get_advisory(user):
    try:
        goals = GoalModel.find_goals_by_user_id(user['_id'])
        if not goals:
            LOGGER.error("No goals found for user")
            return {"message": "No goals found for user"}, 404
        
        advisory_text = get_advisory_recommendation(user, goals)
        
        return {"advice": advisory_text}, 200
    
    except Exception as e:
        LOGGER.error(f"Internal server error: {e}")
        return {"message": "Internal server error"}, 500
