from fastapi import APIRouter

router = APIRouter(
    prefix="/report",
    tags=["Report"]
)

@router.get("/make_report")
async def make_report():
    #hacer reporte
    return

@router.post("/report_made")
async def report_made():
    #reporte completado.
    #eliminar.
    #acualizar
    #volver a inicio
    return