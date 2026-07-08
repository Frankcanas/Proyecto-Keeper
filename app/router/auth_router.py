from fastapi import APIRouter
from app.schemas.auth_schema import LoginSchema, TokenResponse, RegistroSchema
from app.controllers.auth_controller import AuthController

router = APIRouter(prefix="/auth", tags=["Autenticación"])

@router.post("/login", response_model=TokenResponse)
def login(credenciales: LoginSchema):
    return AuthController.login(credenciales)

@router.post("/registro", status_code=201)
def registro(datos: RegistroSchema):
    return AuthController.registro(datos)

