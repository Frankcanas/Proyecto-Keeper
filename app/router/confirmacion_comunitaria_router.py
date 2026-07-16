from fastapi import APIRouter, Depends
from app.models.confirmacion_comunitaria_model import ConfirmacionComunitariaSchema
from app.controllers.confirmacion_comunitaria_controller import ConfirmacionComunitariaController
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/confirmaciones", tags=["Interacción - Confirmación Comunitaria"])

@router.post("/", status_code=201)
def confirmar_reporte(datos: ConfirmacionComunitariaSchema, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return ConfirmacionComunitariaController.create(id_usuario, datos.dict())

@router.get("/reporte/{id_reporte}")
def listar_confirmaciones_de_reporte(id_reporte: int):
    # Cualquiera puede ver las confirmaciones de un reporte (nivel de credibilidad)
    return ConfirmacionComunitariaController.get_all_by_reporte(id_reporte)
