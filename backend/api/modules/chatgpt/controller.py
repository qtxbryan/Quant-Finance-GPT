import logging 
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from api.modules.chatgpt import handler as chatgpt_handler

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

ns = Namespace('chatgpt', description='ChatGPT advisory operations')

advisory_response = ns.model('AdvisoryResponse', {
    'advice': fields.String
})

@ns.route('/advisory')
class AdvisoryResource(Resource):
    @ns.doc(security='Bearer', description="Get financial advisory recommendations")
    @ns.marshal_with(advisory_response)
    @jwt_required()
    def post(self):
        """Get Financial Advisory"""
        try:
            response, status_code = chatgpt_handler.get_advisory()
            return response, status_code
        except Exception as err:
            LOGGER.error(f"Error occurred while fetching advisory: {err}")
            return {"message": "Internal Server error"}, 500
