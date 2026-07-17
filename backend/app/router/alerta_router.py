from fastapi import APIRouter, Depends
from app.models.alerta_model import AlertaSchema
from app.controllers.alerta_controller import AlertaController
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/alertas", tags=["Emergencias - Alertas"])

@router.post("/", status_code=201)
def crear_alerta(datos: AlertaSchema, payload: dict = Depends(verify_token)):
    # Normalmente, solo un moderador/admin debería crear alertas, pero lo dejaremos libre.
    return AlertaController.create(datos.dict())

@router.get("/")
def listar_alertas_activas():
    # Las alertas activas son públicas
    return AlertaController.get_all()

@router.get("/{id_alerta}")
def obtener_alerta(id_alerta: int):
    return AlertaController.get_by_id(id_alerta)
