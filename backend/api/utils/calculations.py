def calculate_future_value(present_value, annual_rate, years):
    """
    Calculate Future Value (FV) adjusted for inflation
    FV = PV * (1 + r)^n
    """
    return present_value * (1 + annual_rate) ** years

def calculate_present_value(future_value, annual_rate, years):
    """
    Calculate Present Value (PV) adjusted for inflation
    PV = FV / (1 + r)^n
    """
    return future_value / (1 + annual_rate) ** years

def monthly_saving_required(target_amount, annual_rate, months):
    """
    Calculate the monthly saving required to reach target_amount considering inflation.
    Using Future Value of a series formula:
    FV = P * [((1 + r)^n - 1) / r]
    Solve for P:
    P = FV / [((1 + r)^n - 1) / r]
    """
    monthly_rate = annual_rate / 12
    if monthly_rate == 0:
        return target_amount / months
    denominator = ((1 + monthly_rate) ** months - 1) / monthly_rate
    return target_amount / denominator

def optimal_interest_rate(present_savings, target_amount, annual_rate, years, tolerance=1e-6):
    """
    Find the interest rate required to grow present_savings to target_amount over years using binary search.
    FV = PV * (1 + r)^n
    """
    low = 0.0
    high = 1.0 # 100% interest rate
    n = years
    while high - low > tolerance: 
        mid = (low + high) / 2 
        fv = present_savings * (1 + mid) ** n
        if fv < target_amount:
            low = mid
        else:
            high = mid
    return round(high * 100, 2) # return as percentage