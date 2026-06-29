from fastapi import APIRouter

router = APIRouter(
    prefix="/modify_report",
    tags=["Modify_Report"]
)

@router.get("/update_report")
async def update_report():
    #Actualizar reporte
    return

@router.patch("/update_completed")
async def update_completed():
    #Reporte actualizado
    #Volver a inicio
    return