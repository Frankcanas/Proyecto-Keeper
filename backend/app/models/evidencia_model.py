from pydantic import BaseModel, Field
from typing import Literal, Optional

class EvidenciaSchema(BaseModel):
    id_reporte: int = Field(..., description="ID del reporte al que pertenece esta evidencia")
    url_archivo: str = Field(..., min_length=5, max_length=255, description="URL donde está guardado el archivo")
    tipo_archivo: Literal['imagen', 'video', 'audio', 'otro'] = Field(..., description="Tipo de archivo")
    descripcion: Optional[str] = Field(None, description="Descripción opcional de la evidencia")
