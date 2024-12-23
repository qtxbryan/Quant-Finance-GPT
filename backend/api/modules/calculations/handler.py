import logging
from api.models.goal import GoalModel
from api.decorators.user_decorator import fetch_user
from api.constants import FinanceConstants
from flask import request, jsonify
from datetime import datetime
from api.utils.calculations import (
    calculate_future_value,
    calculate_present_value,
    monthly_saving_required,
    optimal_interest_rate,
)
from config import Config
from api.serializers import serialize_goal

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

@fetch_user
def feasibility_analysis(user):
    try:
        goals = GoalModel.find_goals_by_user_id(user['_id'])
        feasibility_results = []
        current_date = datetime.now()
        for goal in goals:
            years = (goal['target_date'] - current_date).days / 365
            fv = calculate_future_value(goal['target_amount'], FinanceConstants.INFLATION_RATE, years)
            feasible = user['savings'] >= fv
            feasibility_results.append({
                'goal_id': str(goal['_id']),
                'goal_name': goal['goal_name'],
                'feasible': feasible,
                'future_value': round(fv,2)
            })
            
        return {"feasibiliy": feasibility_results}, 200
    
    except Exception as err:
        LOGGER.error(f"Internal Server Error: {err}")
        return {"message": "Internal Server Error"}, 500

@fetch_user
def monthly_saving_required_calc():
    try:
        data = request.get_json()
        goal_id = data.get('goal_id')
        if not goal_id:
            LOGGER.error("Goal ID not provided")
            raise ValueError("Goal ID not provided")
        
        goal = GoalModel.find_goal_by_id(goal_id)
        if not goal:
            LOGGER.error("Goal not found")
            raise ValueError("Goal not found")
        
        current_date = datetime.now()
        months = (goal['target_date'] - current_date).days / 30
        if months <= 0:
            LOGGER.error("Target date is in the past")
            return {"message": "Target date is in the past"}, 400  
        
        required_saving = monthly_saving_required(
            target_amount=goal['target_amount'],
            annual_rate=FinanceConstants.INFLATION_RATE,
            months=months
        )
        
        return {
            'goal_id': goal_id,
            'goal_name': goal['goal_name'],
            'monthly_saving_required': round(required_saving, 2)
        }, 200
        
    except Exception as err:
        LOGGER.error(f"Internal Server Error: {err}")
        return {"message": "Internal Server Error"}, 500
    
@fetch_user
def optimal_interest_rate_calc(user):
    try:
        goals = GoalModel.find_goals_by_user_id(user['_id'])
        if not goals:
            return {"message": "No goals found for user"}, 404 
        
        total_target = sum([goal['target_amount'] for goal in goals])
        total_savings = user['savings']
        current_date = datetime.now()
        years = max([(goal['target_date'] - current_date).days / 365 for goal in goals])
        if years <=0:
            return {"message": "All target dates are in the past"}, 400

        interest_rate = optimal_interest_rate(
            present_savings=total_savings, 
            target_amount=total_target,
            annual_rate=FinanceConstants.INFLATION_RATE,
            years=years
        )
        
        return {
            "optimal_interest_rate": f"{interest_rate}%"
        }, 200
    
    except Exception as err:
        LOGGER.error(f"Internal Server Error: {err}")
        return {"message": "Internal Server Error"}, 500