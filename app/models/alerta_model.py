from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AlertaSchema(BaseModel):
    id_reporte: int = Field(..., description="ID del reporte que originó la alerta")
    titulo: str = Field(..., min_length=5, max_length=200, description="Título de la alerta")
    mensaje: str = Field(..., min_length=5, description="Mensaje detallado")
    radio_impacto_metros: int = Field(500, gt=0, description="Radio de impacto en metros")
    fecha_expiracion: Optional[datetime] = Field(None, description="Fecha de fin de la alerta")
