from pydantic import BaseModel, Field
from typing import Literal, Optional

class NotificacionSchema(BaseModel):
    id_sos: Optional[int] = Field(None, description="ID del SOS asociado (opcional)")
    titulo: str = Field(..., min_length=5, max_length=200, description="Título de la notificación")
    mensaje: str = Field(..., min_length=5, description="Mensaje de la notificación")
    tipo: Literal['alerta', 'sistema', 'reporte'] = Field(..., description="Tipo de notificación")
