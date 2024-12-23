import logging
from flask_restx import Namespace, Resource , fields, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.modules.stocks import handler as stocks_handler
import os
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

ns = Namespace('stocks', description='Stock operations')

@ns.route('/stocks-db')
class StocksResource(Resource):
    @ns.doc(security='Bearer', description="Insert all stocks into the database")
    @jwt_required()
    def post(self): 
        """Insert stock information into the database."""
        response_data = dict()
        status_code = 201
        try:
            FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')
            stocks_handler.insert_stocks_info(FINNHUB_API_KEY)
            response_data['message'] = "Stocks inserted into DB successfully"
            response_data['status_code'] = 200
        except Exception as err:
            return {"message": "Internal server error"}, 500
        
        return {"message": response_data['message']}, response_data['status_code']
    
    @ns.doc(security="Bearer", description="Get all stocks from the database")
    @jwt_required()
    def get(self):
        """Get all stocks from the database."""
        response_data = dict()
        status_code = 200
        try:
            stocks = stocks_handler.get_all_stocks()
            response_data['stocks'] = stocks
        except Exception as err:
            return {"message": "Internal server error"}, 500
        
        return response_data, status_code
    
@ns.route('/commodities-db')
class CommoditiesResource(Resource):
    @ns.doc(security='Bearer', description="Insert all commodities into the database")
    @jwt_required()
    def post(self):
        """Insert commodities information into the database."""
        response_data = dict()
        status_code = 201
        try:
            FINMODEL_API_KEY = os.getenv('FINMODEL_API_KEY')
            stocks_handler.insert_commodities_info(FINMODEL_API_KEY)
            response_data['message'] = "Commodities inserted into DB successfully"
            response_data['status_code'] = 200
        except Exception as err:
            return {"message": "Internal server error"}, 500
        
        return {"message": response_data['message']}, response_data['status_code']

@ns.route('/cryptocurrencies-db')
class CryptocurrenciesResource(Resource):
    @ns.doc(security='Bearer', description="Insert all cryptocurrencies into the database")
    @jwt_required()
    def post(self):
        """Insert cryptocurrencies information into the database."""
        response_data = dict()
        status_code = 201
        try:
            FINMODEL_API_KEY = os.getenv('FINMODEL_API_KEY')
            stocks_handler.insert_cryptocurrencies_info(FINMODEL_API_KEY)
            response_data['message'] = "Cryptocurrencies inserted into DB successfully"
            response_data['status_code'] = 200
        except Exception as err:
            return {"message": "Internal server error"}, 500
        
        return {"message": response_data['message']}, response_data['status_code']    
    
