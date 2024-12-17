import yfinance as yf 
import numpy as np 
import pandas as pd
from datetime import datetime
from api.models.user import UserModel

def get_SNP500_returns():
    # Download S&P 500 adjusted close prices
    data = yf.download('^GSPC', start="2020-01-01", end=datetime.today().strftime('%Y-%m-%d'))['Adj Close']

    # Calculate daily returns and ensure index is datetime
    returns = data.pct_change().dropna()
    returns.index = pd.to_datetime(returns.index)
    
    # Format the output correctly
    result = [{"date": index.strftime("%Y-%m-%d"), "return": float(value)} 
              for index, value in zip(returns.index, returns.values)]
    return result
    