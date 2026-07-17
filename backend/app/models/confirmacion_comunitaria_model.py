from pydantic import BaseModel, Field
from typing import Literal, Optional

class ConfirmacionComunitariaSchema(BaseModel):
    id_reporte: int = Field(..., description="ID del reporte a confirmar")
    tipo: Literal['confirma', 'no_confirma'] = Field(..., description="Confirmación del usuario")
    comentario: Optional[str] = Field(None, description="Comentario opcional")
