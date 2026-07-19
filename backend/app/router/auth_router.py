from fastapi import APIRouter, Response, HTTPException
from app.schemas.auth_schema import LoginSchema, RegistroSchema
from app.controllers.auth_controller import AuthController

router = APIRouter(prefix="/auth", tags=["Autenticación"])

@router.post("/login")
def login(credenciales: LoginSchema, response: Response):
    resultado = AuthController.login(credenciales)
    
    #Extraemos el token que generó el controlador
    token = resultado["access_token"]
    

    #el token en la cookie con expiración de 7 días (604800 segundos)
    response.set_cookie(
        key="auth_token",         # Nombre de la cookie
        value=token,              # El JWT string
        httponly=True,            # Seguridad: impide que JavaScript lea el token
        secure=False,             # False para desarrollo local (localhost). Cambiar a True en producción (HTTPS).
        samesite="lax",           # Permite que el navegador envíe la cookie en las peticiones de tu SPA
        max_age=604800            # 7 días de vida útil
    )
    
    #Retornamos la respuesta al frontend.
    # Quitamos 'access_token' del JSON para que JS no lo vea,
    # pero le dejamos 'id_rol' y 'nombres' porque JS los necesita para renderizar las vistas.
    return {
        "mensaje": "Inicio de sesión exitoso",
        "id_rol": resultado["id_rol"],
        "nombres": resultado["nombres"]
    }

@router.post("/registro", status_code=201)
def registro(datos: RegistroSchema):
    return AuthController.registro(datos)

@router.post("/logout")
def logout(response: Response):
    # Pedimos al navegador que elimine la cookie inmediatamente
    response.delete_cookie(
        key="auth_token",
        httponly=True,
        secure=False,      # Pon True si estás en producción con HTTPS
        samesite="lax"
    )
    
    return {"mensaje": "Sesión cerrada exitosamente"}