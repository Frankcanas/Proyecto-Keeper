from fastapi import APIRouter, Depends
from app.models.sos_model import SOSSchema
from app.controllers.sos_controller import SOSController
from app.utils.jwt_handler import verify_token
from pydantic import BaseModel, Field
from typing import Literal

router = APIRouter(prefix="/sos", tags=["Emergencias - SOS (Botón de Pánico)"])

@router.post("/", status_code=201)
def crear_sos(datos: SOSSchema, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return SOSController.create(id_usuario, datos.dict())

@router.get("/")
def listar_mis_sos(payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return SOSController.get_all(id_usuario)

class SOSEstadoSchema(BaseModel):
    estado: Literal['realizado', 'cancelado'] = Field(..., description="Nuevo estado")

@router.put("/{id_sos}")
def actualizar_estado_sos(id_sos: int, datos: SOSEstadoSchema, payload: dict = Depends(verify_token)):
    # Útil para cancelar un SOS accidental
    id_usuario = int(payload.get("sub"))
    return SOSController.update(id_sos, id_usuario, datos.dict())
