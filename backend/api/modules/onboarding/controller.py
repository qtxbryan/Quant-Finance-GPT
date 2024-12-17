import logging
from flask_restx import Namespace, Resource , fields, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.modules.onboarding import handler as onboarding_handler

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

ns = Namespace('user', description='Onboarding operations')

# Define the parser to expect JSON body fields
parser = reqparse.RequestParser()
parser.add_argument('name', required=True, type=str, help='Name is required', location='json')
parser.add_argument('age', required=True, type=int, help='Age is required', location='json')
parser.add_argument('income', required=True, type=float, help='Income is required', location='json')
parser.add_argument('savings', required=True, type=float, help='Savings is required', location='json')
parser.add_argument('expenses', required=True, type=float, help='Expenses is required', location='json')
parser.add_argument('debt', required=True, type=float, help='Debt is required', location='json')
parser.add_argument('risk_tolerance', required=True, type=str, help='Risk tolerance is required', location='json',
                    choices=('low', 'medium', 'high'))

@ns.route('/onboard')
class OnboardResource(Resource):
    @ns.doc(security='Bearer', description="Onboard user details")
    @ns.expect(parser, validate=True)
    @jwt_required()
    def post(self):
        """Update user's onboarding data."""
        current_email = get_jwt_identity()
        args = parser.parse_args()
        
        name = args['name']
        age = args['age']
        income = args['income']
        savings = args['savings']
        expenses = args['expenses']
        debt = args['debt']
        risk_tolerance = args['risk_tolerance']

        # Process as before
        try:
            response_data, status_code = onboarding_handler.onboard_user(
                current_email, name, age, income, savings, expenses, debt, risk_tolerance
            )
        except Exception as err:
            # Log the error
            return {"message": "Internal server error"}, 500

        return {"message": response_data['message']}, status_code

#TODO - Implement risk score calculation (Will need to prompt something like "Don't know your risk tolerance, do this test")
@ns.route('/risk-score')
class RiskScoreResource(Resource):
    @ns.doc(security='Bearer', description="Onboard user details")
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        responses = ns.payload
        
        try:
            risk_score = onboarding_handler.calculate_risk_score(responses)
            return {
                "message": "Risk score calculated successfully",
                "risk_score": risk_score
            }, 200
        except Exception as err:
            LOGGER.error(f"Error calculating risk score: {err}")
            return {"message": "Internal server error"}, 500
    
#TODO - Feature to caculate and compare with average singaporeans and see how many percent has this person beaten