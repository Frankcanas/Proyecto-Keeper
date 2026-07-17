from fastapi import APIRouter, Depends
from app.models.notificacion_model import NotificacionSchema
from app.controllers.notificacion_controller import NotificacionController
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/notificaciones", tags=["Emergencias - Notificaciones"])

@router.post("/", status_code=201)
def crear_notificacion(datos: NotificacionSchema, payload: dict = Depends(verify_token)):
    # Nota: Normalmente esto lo crea el sistema backend automáticamente (ej. tras un SOS).
    # Pero exponemos el endpoint por completitud.
    id_usuario = int(payload.get("sub"))
    return NotificacionController.create(id_usuario, datos.dict())

@router.get("/")
def listar_mis_notificaciones(payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return NotificacionController.get_all(id_usuario)

@router.put("/{id_notificacion}/leida")
def marcar_notificacion_leida(id_notificacion: int, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return NotificacionController.mark_as_read(id_notificacion, id_usuario)
