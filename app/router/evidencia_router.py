from fastapi import APIRouter, Depends
from app.models.evidencia_model import EvidenciaSchema
from app.controllers.evidencia_controller import EvidenciaController
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/evidencias", tags=["Interacción - Evidencias"])

@router.post("/", status_code=201)
def subir_evidencia(datos: EvidenciaSchema, payload: dict = Depends(verify_token)):
    return EvidenciaController.create(datos.dict())

@router.get("/reporte/{id_reporte}")
def listar_evidencias_de_reporte(id_reporte: int):
    # Cualquiera puede ver las evidencias de un reporte
    return EvidenciaController.get_all_by_reporte(id_reporte)

@router.get("/{id_evidencia}")
def obtener_evidencia(id_evidencia: int):
    return EvidenciaController.get_by_id(id_evidencia)

@router.delete("/{id_evidencia}")
def eliminar_evidencia(id_evidencia: int, payload: dict = Depends(verify_token)):
    return EvidenciaController.delete(id_evidencia)
