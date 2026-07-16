from pydantic import BaseModel, EmailStr

class LoginSchema(BaseModel):
    correo: EmailStr
    contrasena: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    id_usuario: int
    id_rol: int
    nombres: str

class RegistroSchema(BaseModel):
    nombres: str
    apellidos: str
    cedula: str
    correo: EmailStr
    telefono: str
    contrasena: str

