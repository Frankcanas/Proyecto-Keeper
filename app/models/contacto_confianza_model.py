from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class ContactoConfianzaSchema(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=150, description="Nombre del contacto")
    telefono: str = Field(..., min_length=7, max_length=20, description="Teléfono del contacto")
    correo: Optional[EmailStr] = Field(None, description="Correo electrónico opcional")
    parentesco: Optional[str] = Field(None, max_length=50, description="Parentesco (ej. madre, amigo)")
