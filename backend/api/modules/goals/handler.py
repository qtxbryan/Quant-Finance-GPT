import logging
from api.models.goal import GoalModel
from api.decorators.user_decorator import fetch_user
from flask import request, jsonify
from datetime import datetime
from api.utils.calculations import calculate_future_value
from api.constants import FinanceConstants
from api.serializers import serialize_goal

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

@fetch_user
def insert_goals(user):
    try:
        data = request.get_json()
        if not data:
            LOGGER.error("No input data provided")
            raise ValueError("No input data provided")
        
        # Required fields 
        goal_name = data.get('goal_name')
        target_amount = data.get('target_amount')
        target_date_str = data.get('target_date') # expect ISO format string
        
        if not goal_name or not target_amount or not target_date_str:
            LOGGER.error("Missing required fields")
            raise ValueError("Missing required fields")
        
        try:
            target_date = datetime.fromisoformat(target_date_str)
        except ValueError:
            LOGGER.error("Invalid target date format")
            raise ValueError("Invalid target date format")
        
        # optional fields
        priority = data.get('priority', 3)
        progress = data.get('progress', 0)
        
        # Calculate Future Value considering inflation
        years = (target_date - datetime.now()).days / 365
        fv = calculate_future_value(target_amount, FinanceConstants.INFLATION_RATE, years)
        feasible = user['savings'] >= fv
        
        goal = {
            "user_id": user['_id'],
            "goal_name": goal_name,
            "target_amount": target_amount,
            "target_date": target_date,
            "priority": priority,
            "progress": progress,
            "date_of_complete": None,
            "state": "In Progress" if not feasible else "Completed",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
        
        inserted_id = GoalModel.insert_goal_to_db(goal)
        LOGGER.info(f"Inserted goal with id: {inserted_id}")
        return {
            "message": "Goal inserted into DB successfully",
            "goal_id": str(inserted_id),
            "feasible": feasible,
            "future_value": round(fv, 2)
        }, 201
    
    except Exception as e:
        LOGGER.error(f"Internal server error: {e}")
        return {"message": "Internal server error"}, 500

@fetch_user
def get_goals(user): 
    try:
        goals = GoalModel.find_goals_by_user_id(user['_id'])
        
        # serailize goals for JSON response
        serialized_goals = [serialize_goal(goal) for goal in goals]
        LOGGER.info(f'Fetched {len(serialized_goals)} goals for user {user['email']}')
        return {"goals": serialized_goals}, 200
    
    except Exception as e:
        LOGGER.error(f"Internal server error {e}")
        return {"message": "Internal server error"}, 500
    
@fetch_user
def update_goal(goal_id):
    try:
        data = request.get_json()
        if not data:
            LOGGER.error("No input data provided for update")
            raise ValueError("No input data provided for update")
        
        goal = GoalModel.find_goal_by_id(goal_id)
        if not goal:
            LOGGER.error("Goal not found")
            return {"message": "Goal not found"}, 404
        
        updated_fields = {}
        
        if 'goal_name' in data:
            updated_fields['goal_name'] = data['goal_name']
        if 'target_amount' in data:
            updated_fields["target_amount"] = data["target_amount"]
        if 'target_date' in data:  
            try:
                updated_fields["target_date"] = datetime.fromisoformat(data["target_date"])
            except ValueError:
                LOGGER.error("Invalid target date format")
                raise ValueError("Invalid target date format")
        if 'priority' in data:
            updated_fields['priority'] = data['priority']
        if 'progress' in data:
            updated_fields['progress'] = data['progress']
            if data['progress'] >= 100:
                updated_fields['state'] = "Complete"
                updated_fields['date_of_complete'] = datetime.now()
        if 'state' in data:
            updated_fields['state'] = data['state']
            if data['state'] == "Complete":
                updated_fields['date_of_complete'] = datetime.now()
        if not updated_fields:
            LOGGER.error("No valid fields provided for update")
            return {"message": "No valid fields provided for update"}, 400
        
        modified_count = GoalModel.update_goal(goal_id, updated_fields)
        if modified_count == 0:
            LOGGER.error("Goal update failed")
            return {"message": "Goal update failed"}, 500
        
        # Fetch the updated goal to return 
        updated_goal = GoalModel.find_goal_by_id(goal_id)
        serialized_goal = serialize_goal(updated_goal)
        
        return serialized_goal, 200

    except Exception as e:
        LOGGER.error("Internal server error")
        return {"message": "Internal server error"}, 500

@fetch_user
def delete_goal(goal_id):
    try:
        goal = GoalModel.find_goal_by_id(goal_id)
        if not goal:
            LOGGER.error("Goal not found")
            return {"message": "Goal not found"}, 404
        
        # instead of deleting, mark it as deleted to keep data integrity
        updated_fields = {
            "state": "Deleted",
            "updated_at": datetime.now()
        }
        
        modified_count = GoalModel.update_goal(goal_id, updated_fields)
        if modified_count == 0:
            LOGGER.error("Goal deletion failed")
            return {"message": "Goal deletion failed"}, 500
        
        return {"message": "Goal deleted successfully"}, 200
    
    except Exception as err:
        LOGGER.error(f"Internal server error: {err}")
        return {"message": "Internal server error"}, 500
