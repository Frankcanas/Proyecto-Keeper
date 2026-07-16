from pydantic import BaseModel, Field
from typing import Optional

class EstadoReporteSchema(BaseModel):
    nombre_estado: str = Field(..., min_length=3, max_length=50, description="Nombre del estado (ej. Pendiente)")
    descripcion: Optional[str] = Field(None, description="Descripción del estado")
