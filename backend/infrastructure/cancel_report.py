from fastapi import APIRouter

router = APIRouter(
    prefix="/cancel",
    tags=["Cancel"]
)

@router.get("/delete_report")
async def delete_form():
    #Eliminar report form
    return

@router.delete("/delete_report")
async def delete_completed():
    #Proceso completado
    #volver atras
    return