import openai 
from api.extensions import mongo 
from config import Config

openai.api_key = Config.OPENAI_API_KEY

def get_advisory_recommendation(user_data, goals_data):
    """
    Generate financial advisory recommendations
    """
    goals_name = ', '.join([goal['goal_name'] for goal in goals_data])
    prompt = f"""
    You are a financial advisor. here is the user's financial information:
    Age: {user_data['age']}
    Debts: SGD {user_data['debts']}
    Monthly Expenses: SGD {user_data['monthly_expenses']}
    Monthly Income: SGD {user_data['monthly_income']}
    Savings: SGD {user_data['savings']}
    Risk Tolerance: {user_data['risk_tolerance']}
    
    Here are the user's financial goals: 
    {goals_name}
    
    Based on this information, provide personalized financial advice to help the user achieve their goals.
    """
    try:
        response = openai.Completion.create(
            engine="text-davinci-0003",
            prompt=prompt,
            max_tokens = 500,
            temperature = 0.7
        )
        return response.choices[0].text.strip()
    # Need to also handle exception when not enough limit
    except Exception as e:
        return "Unable to provide advisory at this time"