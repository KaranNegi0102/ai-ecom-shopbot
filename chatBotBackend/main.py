from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from helper import DBoperation
from pydantic import BaseModel

# Initialize the database operation object
obj = DBoperation()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the EcomWeb API!"}

@app.get("/all_ac_products")
async def get_all_ac_products():
    try:
        result = obj.get_all_ac_data()
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/all_tv_products")
async def get_all_tv_products():
    try:
        result = obj.get_all_tv_data()
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/all_phones_products")
async def get_all_phones_products():
    try:
        result = obj.get_all_phones_data()
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class QueryRequest(BaseModel):
    query: str

@app.post("/send_query")
async def send_query(request: QueryRequest):
    
    result = obj.call_llm_tool_function_call(us_query=request.query)
    if "msg" in result:
        return result
    return result

@app.get("/get_products")
async def send_query():
    
    result = obj.get_all_products()
    if "msg" in result:
        return result
    return result

if __name__ == "___main___":
    import uvicorn
    uvicorn.run(app,host="0.0.0.0",port=8000)