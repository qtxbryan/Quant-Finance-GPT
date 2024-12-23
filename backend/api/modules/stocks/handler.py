import requests
import openai 
import logging
from api.models.stock import StockModel

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

def insert_stocks_info(FINNHUB_API_KEY): 
    url = "https://finnhub.io/api/v1/stock/symbol"
    params = {
        "exchange": "US",
        "token": FINNHUB_API_KEY
    }
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        stocks = response.json()
        StockModel.insert_stocks_to_db(stocks)
    else: 
        LOGGER.error(f"Failed to fetch stock data: {response.status_code}")
        
def get_all_stocks():
    stocks = StockModel.get_all_stocks()
    return stocks

def insert_commodities_info(FINMODEL_API_KEY):
    url = 'https://financialmodelingprep.com/api/v3/symbol/available-commodities'
    params = {"apiKey": FINMODEL_API_KEY}
    
    response = requests.get(url, params=params)
    LOGGER.info(f"Commodities response: {response}")
    LOGGER.info(f"Commodities response status: {response.status_code}")
    
    if response.status_code == 200:
        commodities = response.json()
        StockModel.insert_commodities_to_db(commodities)
    else:
        LOGGER.error(f"Failed to fetch commodities data: {response.status_code}")
        
def insert_cryptocurrencies_info(FINMODEL_API_KEY):
    url = 'https://financialmodelingprep.com/api/v3/symbol/available-cryptocurrencies?apikey=yIwnijKAvyNZrW3BuZIOg3f3LbZYkkIM'
    params = {"apiKey": FINMODEL_API_KEY}
    
    response = requests.get(url)
    
    if response.status_code == 200:
        cryptocurrencies = response.json()
        StockModel.insert_cryptocurrency_to_db(cryptocurrencies)
    else:
        LOGGER.error(f"Failed to fetch cryptocurrencies data: {response.status_code}")

def insert_etf_info(FINMODEL_API_KEY):
    url = 'https://financialmodelingprep.com/api/v3/etf/list'
    params = {"apikey": FINMODEL_API_KEY}
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        etfs = response.json()
        StockModel.insert_etf_to_db(etfs)
    else:
        LOGGER.error(f"Failed to fetch ETF data: {response.status_code}")