from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, time

class Reporte(BaseModel):
    id_categoria: int = Field(..., description="ID de la categoría del incidente")
    # id_estado no se pide al usuario normal; el backend siempre debería asignarle 1 ("Pendiente") por defecto al crearlo.
    titulo: str = Field(..., min_length=5, max_length=200)
    descripcion: Optional[str] = None
    latitud: float = Field(..., ge=-90, le=90)
    longitud: float = Field(..., ge=-180, le=180)
    # id_usuario no va aquí porque lo sacaremos del token de seguridad para evitar suplantaciones

class ReporteUpdate(BaseModel):
    id_categoria: Optional[int] = None
    id_estado: Optional[int] = None
    titulo: Optional[str] = Field(None, min_length=5, max_length=200)
    descripcion: Optional[str] = None
    latitud: Optional[float] = Field(None, ge=-90, le=90)
    longitud: Optional[float] = Field(None, ge=-180, le=180)
