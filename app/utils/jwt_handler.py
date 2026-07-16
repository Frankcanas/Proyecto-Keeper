import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from fastapi import HTTPException, Request

# Configuración JWT (lo ideal es que SECRET_KEY esté en el .env)
SECRET_KEY = os.getenv("SECRET_KEY", "keep_secret_key_super_segura_123")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # El token durará 7 días para desarrollo

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


def verify_token(request: Request):
    # Obtener el JWT desde la cookie
    token = request.cookies.get("auth_token")

    if not token:
        raise HTTPException(
            status_code=401,
            detail="No autenticado"
        )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        usuario_id = payload.get("sub")

        if usuario_id is None:
            raise HTTPException(
                status_code=401,
                detail="Token inválido, credenciales no encontradas"
            )

        return payload

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="El token ha expirado o es inválido"
        )