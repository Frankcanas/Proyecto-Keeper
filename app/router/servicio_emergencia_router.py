from fastapi import APIRouter, Depends
from app.models.servicio_emergencia_model import ServicioEmergenciaSchema
from app.controllers.servicio_emergencia_controller import ServicioEmergenciaController
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/servicios_emergencia", tags=["Catálogos - Servicios"])

@router.post("/", status_code=201)
def crear_servicio(datos: ServicioEmergenciaSchema, payload: dict = Depends(verify_token)):
    return ServicioEmergenciaController.create(datos.dict())

@router.get("/")
def listar_servicios():
    return ServicioEmergenciaController.get_all()

@router.get("/{id_servicio}")
def obtener_servicio(id_servicio: int):
    return ServicioEmergenciaController.get_by_id(id_servicio)

@router.put("/{id_servicio}")
def actualizar_servicio(id_servicio: int, datos: ServicioEmergenciaSchema, payload: dict = Depends(verify_token)):
    return ServicioEmergenciaController.update(id_servicio, datos.dict(exclude_unset=True))

@router.delete("/{id_servicio}")
def eliminar_servicio(id_servicio: int, payload: dict = Depends(verify_token)):
    return ServicioEmergenciaController.delete(id_servicio)
