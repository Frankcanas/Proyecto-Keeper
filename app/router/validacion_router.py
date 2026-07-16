from fastapi import APIRouter, Depends
from app.models.validacion_model import ValidacionSchema
from app.controllers.validacion_controller import ValidacionController
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/validaciones", tags=["Interacción - Validaciones (Moderador)"])

@router.post("/", status_code=201)
def validar_reporte(datos: ValidacionSchema, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    # Opcional: Validar que payload.get("rol") == 'moderador', pero lo dejaremos libre por ahora.
    return ValidacionController.create(id_usuario, datos.dict())

@router.get("/reporte/{id_reporte}")
def listar_validaciones_de_reporte(id_reporte: int, payload: dict = Depends(verify_token)):
    return ValidacionController.get_all_by_reporte(id_reporte)
