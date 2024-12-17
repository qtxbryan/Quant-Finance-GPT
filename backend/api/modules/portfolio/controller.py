import logging
from flask_restx import Namespace, Resource 
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.modules.portfolio import handler as portfolio_handler

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

ns = Namespace('portfolio', description='Onboarding operations')

@ns.route('/get_sp500_returns')
class GetSP500Returns(Resource):
    def get(self):
        result = portfolio_handler.get_SNP500_returns()
        return result, 200


