from pydantic import BaseModel, Field
from typing import Literal

class ZonaFavoritaSchema(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=100, description="Nombre de la zona (ej. Mi casa)")
    tipo: Literal['casa', 'trabajo', 'universidad', 'otro'] = Field(..., description="Tipo de zona")
    latitud: float = Field(..., ge=-90, le=90, description="Latitud")
    longitud: float = Field(..., ge=-180, le=180, description="Longitud")
    radio_metros: int = Field(100, gt=0, description="Radio de cobertura en metros")
