from fastapi import APIRouter

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/")
async def map():
    #Aqui debe estar el inicio con reportes hechos
    return
