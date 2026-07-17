from pydantic import BaseModel, Field
from typing import Optional

class ServicioEmergenciaSchema(BaseModel):
    nombre: str = Field(..., min_length=3, max_length=150, description="Nombre del servicio (ej. Policía)")
    descripcion: Optional[str] = Field(None, description="Descripción")
    telefono: str = Field(..., min_length=7, max_length=20, description="Número de teléfono de emergencia")
    instrucciones: Optional[str] = Field(None, description="Instrucciones en caso de llamar")
