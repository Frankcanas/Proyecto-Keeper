from fastapi import APIRouter
from typing import List
from app.models.usuario_model import Usuario, UsuarioUpdate
from app.controllers.usuario_controller import UsuarioController

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.get("/")
def get_usuarios():
    return UsuarioController.get_all()

@router.get("/{id_usuario}")
def get_usuario(id_usuario: int):
    return UsuarioController.get_by_id(id_usuario)

@router.post("/", status_code=201)
def create_usuario(usuario: Usuario):
    return UsuarioController.create(usuario)

@router.put("/{id_usuario}")
def update_usuario(id_usuario: int, usuario: UsuarioUpdate):
    return UsuarioController.update(id_usuario, usuario)

@router.delete("/{id_usuario}")
def delete_usuario(id_usuario: int):
    return UsuarioController.delete(id_usuario)
