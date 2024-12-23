import logging 
from flask_restx import Namespace, Resource, fields, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.modules.goals import handler as goals_handler

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

ns = Namespace('goals', description='Goal operations')

goal_model = ns.model('Goal', {
    'goal_name': fields.String(required=True, description='Goal Name'),
    'target_amount': fields.Float(required=True, description='Target Amount'),
    'target_date': fields.String(required=True, description='Target Date'),
    'priority': fields.Integer(required=False, description='Priority of goal'),
    'progress': fields.Float(required=False, description='Progress of goal'),
    'feasible': fields.Boolean(required=False, description='Feasibility of goal')
})

goal_response_model = ns.model('GoalResponse', {
    'id': fields.String(description='Goal ID'),
    'goal_name': fields.String(description='Name of the goal'),
    'target_amount': fields.Float(description='Target amount for the goal'),
    'target_date': fields.String(description='Target date in ISO format (YYYY-MM-DD)'),
    'priority': fields.Integer(description='Priority of the goal'),
    'progress': fields.Integer(description='Progress of the goal'),
    'date_of_complete': fields.String(description='Completion date in ISO format (YYYY-MM-DD)'),
    'state': fields.String(description='State of the goal'),
    'created_at': fields.String(description='Creation timestamp in ISO format'),
    'updated_at': fields.String(description='Last update timestamp in ISO format')
})

update_goal_model = ns.model('UpdateGoal', {
    'goal_name': fields.String(required=False, description='Goal Name'),
    'target_amount': fields.Float(required=False, description='Target Amount'),
    'target_date': fields.String(required=False, description='Target Date (YYYY-MM-DD)'),
    'priority': fields.Integer(required=False, description='Priority of goal'),
    'progress': fields.Float(required=False, description='Progress of goal'),
    'state': fields.String(required=False, description='State of goal')
})

@ns.route('/')
class GoalsResource(Resource):
    @ns.doc(security='Bearer', description="Insert all stocks into the database")
    @ns.expect(goal_model, validate=True)
    @jwt_required()
    def post(self):
        """Add a new goal"""
        try: 
            response, status_code = goals_handler.insert_goals()
            return response, status_code
        except Exception as err:
            LOGGER.error(f"Error occurred while adding a new goal: {err}")
            return {"message": "Internal Server error"}, 500
        
    @ns.doc(security='Bearer', description="Get all goals from the database")
    @ns.marshal_with(goal_response_model, as_list=True, description="List of user goals")
    @jwt_required()
    def get(self):
        """Get all goals for the current user"""
        try:
            response, status_code = goals_handler.get_goals()
            return response, status_code
        except Exception as err:
            LOGGER.error(f"An error occurred while fetching goals: {err}")
            return {"message": "Internal Server error"}, 500
        
@ns.route('/<string:goal_id>')
@ns.param('goal_id', 'Goal ID')
class GoalResource(Resource):
    @ns.doc(security='Bearer', description="Update a goal")
    @ns.expect(update_goal_model, validate=True)
    @jwt_required()
    def put(self, goal_id):
        """Update a goal"""
        try:
            response, status_code = goals_handler.update_goal(goal_id)
            return response, status_code
        except Exception as err:
            LOGGER.error(f"Error occurred while updating goal: {err}")
            return {"message": "Internal Server error"}, 500
        
    @ns.doc(security='Bearer', description="Delete a goal")
    @jwt_required()
    def delete(self, goal_id):
        """Delete a goal"""
        try:
            response, status_code = goals_handler.delete_goal(goal_id)
            return response, status_code
        except Exception as err:
            LOGGER.error(f"Error occurred while deleting goal: {err}")
            return {"message": "Internal Server error"}, 500