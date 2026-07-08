from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import date

class Usuario(BaseModel):
    id_rol: int = Field(..., description="ID del rol asociado al usuario")
    nombres: str = Field(..., min_length=2, max_length=100)
    apellidos: str = Field(..., min_length=2, max_length=100)
    fecha_nacimiento: Optional[date] = None
    cedula: str = Field(..., min_length=5, max_length=20)
    correo: EmailStr
    telefono: str = Field(..., min_length=7, max_length=20)
    password_hash: str = Field(..., min_length=6, description="Contraseña en texto plano para crear, se hasheará en el controller")
    foto_perfil: Optional[str] = None

class UsuarioUpdate(BaseModel):
    id_rol: Optional[int] = None
    nombres: Optional[str] = Field(None, min_length=2, max_length=100)
    apellidos: Optional[str] = Field(None, min_length=2, max_length=100)
    fecha_nacimiento: Optional[date] = None
    cedula: Optional[str] = Field(None, min_length=5, max_length=20)
    correo: Optional[EmailStr] = None
    telefono: Optional[str] = Field(None, min_length=7, max_length=20)
    password_hash: Optional[str] = Field(None, min_length=6)
    foto_perfil: Optional[str] = None
