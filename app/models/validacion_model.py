from pydantic import BaseModel, Field
from typing import Literal, Optional

class ValidacionSchema(BaseModel):
    id_reporte: int = Field(..., description="ID del reporte a validar")
    decision: Literal['aceptado', 'rechazado'] = Field(..., description="Decisión del moderador")
    comentario: Optional[str] = Field(None, description="Comentario del moderador")
