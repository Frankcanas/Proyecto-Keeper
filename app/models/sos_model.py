from pydantic import BaseModel, Field
from typing import Literal

class SOSSchema(BaseModel):
    id_servicio: int = Field(..., description="ID del servicio de emergencia (ej. Policía)")
    latitud: float = Field(..., ge=-90, le=90, description="Latitud")
    longitud: float = Field(..., ge=-180, le=180, description="Longitud")
    estado: Literal['realizado', 'cancelado'] = Field('realizado', description="Estado inicial")
