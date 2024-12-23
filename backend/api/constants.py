class MetaConst(type):
    def __getattr__(cls, key):
        return cls[key]
    def __setattr__(cls, key, value):
        raise ValueError("Constants are read-only", cls)
    
class Const(object, metaclass=MetaConst):
    def __getattr__(self, name):
        return self[name]
    
    def __setattr__(self, name, value):
        raise ValueError("Constants are read-only", self)
    
class AppConstants(Const):
    VERSION = "v1"
    API_VERSION_PREFIX='api/'
    APP_VERSION_URL = API_VERSION_PREFIX + VERSION
    
class FinanceConstants(Const):
    INFLATION_RATE = 0.02