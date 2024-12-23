from api.extensions import mongo, bcrypt
from bson.objectid import ObjectId
import logging 

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

class StockModel: 
    @classmethod
    def insert_stocks_to_db(cls, stocks):
        new_stocks = []
        
        # check if stock already exists in DB
        for stock in stocks:
            exists = mongo.db.stocks.find_one({"symbol": stock['symbol']})
            if not exists:
                new_stock = {
                    "symbol": stock['symbol'],
                    "name": stock.get('description', ""),
                    "type": stock.get('type', "")
                }
                new_stocks.append(new_stock)
        
        # insert new stocks into DB
        if new_stocks:
            mongo.db.stocks.insert_many(new_stocks)
            LOGGER.info(f"Inserted {len(new_stocks)} records into DB")
        else:
            LOGGER.info("No stocks to insert")
            
    @classmethod
    def insert_commodities_to_db(cls, commodities):
        new_commodities = []
        # check if commodity already exists in DB
        for commodity in commodities:
            exists = mongo.db.stocks.find_one({"symbol": commodity["symbol"]})
            if not exists:
                new_commodity = {
                    "symbol": commodity['symbol'],
                    "name": commodity['name'],
                    "type": "Commodities"
                }
                new_commodities.append(new_commodity)
        
        # insert new commodities into DB 
        if new_commodities:
            mongo.db.stocks.insert_many(new_commodities)
            LOGGER.info(f"Inserted {len(new_commodities)} commodities into DB")
        else:
            LOGGER.info("No new commodities to insert")
            
    @classmethod
    def insert_cryptocurrency_to_db(cls, cryptocurrencies):
        new_cryptocurrencies = []
        # check if cryptocurrency already exists in DB
        for cryptocurrency in cryptocurrencies:
            exists = mongo.db.stocks.find_one({"symbol": cryptocurrency["symbol"]})
            if not exists:
                new_cryptocurrency = {
                    "symbol": cryptocurrency['symbol'],
                    "name": cryptocurrency['name'],
                    "type": "Cryptocurrencies"
                }
                new_cryptocurrencies.append(new_cryptocurrency)
        
        # insert new cryptocurrencies into DB 
        if new_cryptocurrencies:
            mongo.db.stocks.insert_many(new_cryptocurrencies)
            LOGGER.info(f"Inserted {len(new_cryptocurrencies)} cryptocurrencies into DB")
        else:
            LOGGER.info("No new cryptocurrencies to insert")
    
    @classmethod
    def insert_etf_to_db(cls, etfs):
        new_etfs = []
        # check if etf already exists in DB
        for etf in etfs:
            exists = mongo.db.stocks.find_one({"symbol": etf["symbol"]})
            if not exists:
                new_etf = {
                    "symbol": etf['symbol'],
                    "name": etf['name'],
                    "type": "ETFs"
                }
                new_etfs.append(new_etf)
        
        # insert new etfs into DB 
        if new_etfs:
            mongo.db.stocks.insert_many(new_etfs)
            LOGGER.info(f"Inserted {len(new_etfs)} etfs into DB")
        else:
            LOGGER.info("No new etfs to insert")
            
    
    
    