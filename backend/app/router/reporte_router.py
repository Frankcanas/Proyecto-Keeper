from fastapi import APIRouter, Depends
from typing import List
from app.models.reporte_model import Reporte, ReporteUpdate
from app.controllers.reporte_controller import ReporteController
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/reportes", tags=["Reportes"])

@router.get("/")
def get_reportes():
    return ReporteController.get_all()

@router.get("/{id_reporte}")
def get_reporte(id_reporte: int):
    return ReporteController.get_by_id(id_reporte)

# Aquí protegemos la ruta: solo alguien logueado (con token válido) puede crear un reporte
@router.post("/", status_code=201)
def create_reporte(reporte: Reporte, payload: dict = Depends(verify_token)):
    # Extraemos el id_usuario del token de seguridad (el campo 'sub')
    id_usuario = int(payload.get("sub"))
    return ReporteController.create(reporte, id_usuario)

# La actualización y eliminación también deberían estar protegidas en un escenario real,
# e incluso validar que el usuario que borra sea el dueño del reporte o un admin.
@router.put("/{id_reporte}")
def update_reporte(id_reporte: int, reporte: ReporteUpdate, payload: dict = Depends(verify_token)):
    return ReporteController.update(id_reporte, reporte)

@router.delete("/{id_reporte}")
def delete_reporte(id_reporte: int, payload: dict = Depends(verify_token)):
    return ReporteController.delete(id_reporte)
