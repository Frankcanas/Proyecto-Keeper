from pydantic import BaseModel, Field
from typing import Optional

class Rol(BaseModel):
    nombre: str = Field(..., min_length=3, max_length=50, description="Nombre único del rol")
    descripcion: Optional[str] = Field(None, description="Descripción opcional del rol")

class RolUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=3, max_length=50)
    descripcion: Optional[str] = Field(None)
