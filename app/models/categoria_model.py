from pydantic import BaseModel, Field
from typing import Optional

class CategoriaSchema(BaseModel):
    nombre: str = Field(..., min_length=3, max_length=100, description="Nombre de la categoría")
    descripcion: Optional[str] = Field(None, description="Descripción")
    icono: Optional[str] = Field(None, max_length=100, description="Ícono representativo")
    color: Optional[str] = Field(None, pattern=r'^#[0-9A-Fa-f]{6}$', description="Color en formato Hex (ej. #FF0000)")
