from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    Form
)

from app.controllers.evidencia_controller import EvidenciaController
from app.utils.jwt_handler import verify_token

router = APIRouter(
    prefix="/evidencias",
    tags=["Interacción - Evidencias"]
)


@router.post("/")
async def subir_evidencia(
    id_reporte: int = Form(...),
    descripcion: str = Form(None),
    archivo: UploadFile = File(...),
    payload: dict = Depends(verify_token)
):
    return await EvidenciaController.create(
        id_reporte,
        descripcion,
        archivo
    )


@router.get("/reporte/{id}")
def obtener_evidencias(id: int):
    return EvidenciaController.get_all_by_reporte(id)


@router.get("/{id}")
def obtener_evidencia(id: int):
    return EvidenciaController.get_by_id(id)