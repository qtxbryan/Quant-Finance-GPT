"""Onboarding handler"""
import logging
from api.models.user import UserModel

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

def onboard_user(email, name, age, income, savings, expenses, debt, risk_tolerance):
    try:
        user = UserModel.find_user_by_email(email)
        if not user:
            return {"message": "User not found"}, 404
        
        UserModel.update_user_onboarding(email, name, age, income, savings, expenses, debt, risk_tolerance)
        
        # Calculate available income for savings and investments
        available_for_savings = max(0, income - (expenses + debt))
        
        # Prepare financial snapshot
        financial_snapshot = {
            "name": name,
            "age": age,
            "monthly_income": income,
            "monthly_expenses": expenses,
            "monthly_debts": debt,
            "current_savings": savings,
            "available_for_savings_investments": available_for_savings
        }
        
        response_message = (
            f"Based on your input, you have ${available_for_savings:.2f} "
            "available monthly for savings and investments."
        )
        
        return {
            "financial_snapshot": financial_snapshot,
            "message": response_message
        }, 200
        
    except Exception as err:
        LOGGER.error(f"Encountered error while trying to onboard user: {err}")
        return {"message": "An error occurred while onboarding the user."}, 500

def calculate_risk_score(responses):
    scores = {
        "investment_knowledge": {"Beginner": 1, "Intermediate": 3, "Advanced": 5},
        "time_horizon": {"Short": 1, "Medium": 3, "Long": 5},
        "risk_capacity": {10: 1, 20: 2, 30: 3, 40: 4, 50: 5},
        "expected_return": {5: 1, 10: 2, 15: 3, 20: 4, 25: 5},
        "investment_experience": {"Never": 1, "Occasionally": 3, "Frequently": 5},
        "financial_security": {"No": 1, "Some": 3, "Yes": 5},
        "market_reaction": {"Sell everything": 1, "Wait it out": 3, "Buy more": 5},
    }
    
    score = (
        scores["investment_knowledge"][responses['investment_knowledge']] * 2 +
        scores["time_horizon"][responses['time_horizon']] * 2 +
        scores["risk_capacity"][responses['risk_capacity']] +
        scores["expected_return"][responses['expected_return']] +
        scores["investment_experience"][responses['investment_experience']] +
        scores["financial_security"][responses['financial_security']] +
        scores["market_reaction"][responses['market_reaction']]
    )
    
    # Cap score at 35
    return min(max(score, 0), 35)