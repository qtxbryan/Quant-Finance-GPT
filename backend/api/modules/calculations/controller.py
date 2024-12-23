import logging 
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from api.modules.calculations import handler as calculations_handler

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

ns = Namespace('calculations', description='Financial calculation operations')

feasibility_response = ns.model('FeasibilityResponse', {
    'feasibility': fields.List(fields.Nested(ns.model('Feasibility', {
        'goal_id': fields.String,
        'goal_name': fields.String,
        'feasible': fields.Boolean,
        'future_value': fields.Float
    })))
})

monthly_saving_request = ns.model('MonthlySavingRequest', {
    'goal_id': fields.String(required=True, description='Goal ID')
})

monthly_saving_response = ns.model('MonthlySavingResponse', {
    'goal_id': fields.String,
    'goal_name': fields.String,
    'monthly_saving_required': fields.Float
})

optimal_interest_response = ns.model('OptimalInterestResponse', {
    'optimal_interest_rate': fields.String
})

@ns.route('/feasibility')
class FeasibilityResource(Resource):
    @ns.doc(security='Bearer', description="Perform feasibility analysis on all user goals")
    @ns.marshal_with(feasibility_response)
    @jwt_required()
    def post(self):
        """Feasibility Analysis"""
        LOGGER.info("Starting feasibility analysis")
        response, status = calculations_handler.feasibility_analysis()
        return response, status

@ns.route('/monthly_saving')
class MonthlySavingResource(Resource):
    @ns.doc(security='Bearer', description="Calculate monthly saving required for a specific goal")
    @ns.expect(monthly_saving_request, validate=True)
    @ns.marshal_with(monthly_saving_response)
    @jwt_required()
    def post(self):
        """Calculate Monthly Saving Required"""
        LOGGER.info("Calculating monthly saving required")
        response, status = calculations_handler.monthly_saving_required_calc()
        return response, status

@ns.route('/optimal_interest')
class OptimalInterestResource(Resource):
    @ns.doc(security='Bearer', description="Calculate optimal interest rate for portfolio")
    @ns.marshal_with(optimal_interest_response)
    @jwt_required()
    def post(self):
        """Calculate Optimal Interest Rate"""
        LOGGER.info("Calculating optimal interest rate")
        response, status = calculations_handler.optimal_interest_rate_calc()
        return response, status