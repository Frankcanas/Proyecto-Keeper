from fastapi import APIRouter
from typing import List
from app.models.rol_model import Rol, RolUpdate
from app.controllers.rol_controller import RolController

router = APIRouter(prefix="/roles", tags=["Roles"])

@router.get("/")
def get_roles():
    return RolController.get_all()

@router.get("/{id_rol}")
def get_rol(id_rol: int):
    return RolController.get_by_id(id_rol)

@router.post("/", status_code=201)
def create_rol(rol: Rol):
    return RolController.create(rol)

@router.put("/{id_rol}")
def update_rol(id_rol: int, rol: RolUpdate):
    return RolController.update(id_rol, rol)

@router.delete("/{id_rol}")
def delete_rol(id_rol: int):
    return RolController.delete(id_rol)
