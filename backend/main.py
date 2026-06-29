from fastapi import FastAPI
from infrastructure.dashboard import router as dashboard
from infrastructure.cancel_report import router as cancel_report
from infrastructure.update_report import router as update_report
from infrastructure.report import router as make_report
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifepan(app: FastAPI):
    yield

origins = [
    "http://localhost:5400",
    "http://localhost:5400",
]

app = FastAPI(
    title="KeepeR_Map_Manager", 
    lifespan=lifepan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers = ["*"],
)

@app.get("/")
async def root():
    #Debe redirigir a Dashboard
    #Si no estas logeado te saca al inicio de sesion.
    return {"message": "connection fastapi and vite completed"}

app.include_router(dashboard)
app.include_router(make_report)
app.include_router(update_report)
app.include_router(cancel_report)