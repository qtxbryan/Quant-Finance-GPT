from flask import Flask, Blueprint
from flask_restx import Api
from flask_jwt_extended import JWTManager
from api.config import Config
from api.constants import AppConstants as const
from api.extensions import mongo, bcrypt
from flask_cors import CORS

authorizations = {
    'Bearer': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config.from_object(Config)

    # Initialize extensions with the app
    mongo.init_app(app)
    bcrypt.init_app(app)
    jwt = JWTManager(app)

    # Ensure we have a proper db set; if mongo.db is None, manually set it.
    with app.app_context():
        # Check if mongo.db is None - if so, try assigning it from config
        if mongo.db is None:
            db_name = app.config.get("MONGO_DBNAME")
            if db_name:
                # Manually select the database if auto-assignment didn't work
                mongo.db = mongo.cx[db_name]

        try:
            # Test the DB connection
            mongo.cx.server_info()
            if mongo.db is not None:
                print(f"MongoDB connected successfully to {mongo.db.name}!")
            else:
                print("mongo.db is still None. Check MONGO_URI and MONGO_DBNAME.")
        except Exception as e:
            print("Failed to connect to MongoDB:", e)

    # Register blueprints
    api_v1_blueprint, api_v1 = create_api_v1()
    register_namespaces(api_v1)
    app.register_blueprint(api_v1_blueprint)

    return app

def create_api_v1():
    blueprint = Blueprint('API v1', __name__, url_prefix='/' + const.APP_VERSION_URL)
    api = Api(blueprint, version='1.0', title='Quant Finance API',
              description='API for Quant Finance',
              authorizations=authorizations,
              security='Bearer')
    return blueprint, api

def register_namespaces(api):
    from api.modules.auth import controller as auth_controller
    api.add_namespace(auth_controller.ns)

    from api.modules.onboarding import controller as onboarding_controller
    api.add_namespace(onboarding_controller.ns)
    
    from api.modules.portfolio import controller as portfolio_controller
    api.add_namespace(portfolio_controller.ns)

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
