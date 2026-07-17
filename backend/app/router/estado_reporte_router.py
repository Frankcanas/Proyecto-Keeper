from fastapi import APIRouter, Depends
from app.models.estado_reporte_model import EstadoReporteSchema
from app.controllers.estado_reporte_controller import EstadoReporteController
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/estados_reporte", tags=["Catálogos - Estados"])

@router.post("/", status_code=201)
def crear_estado(datos: EstadoReporteSchema, payload: dict = Depends(verify_token)):
    return EstadoReporteController.create(datos.dict())

@router.get("/")
def listar_estados():
    return EstadoReporteController.get_all()

@router.get("/{id_estado}")
def obtener_estado(id_estado: int):
    return EstadoReporteController.get_by_id(id_estado)

@router.put("/{id_estado}")
def actualizar_estado(id_estado: int, datos: EstadoReporteSchema, payload: dict = Depends(verify_token)):
    return EstadoReporteController.update(id_estado, datos.dict(exclude_unset=True))

@router.delete("/{id_estado}")
def eliminar_estado(id_estado: int, payload: dict = Depends(verify_token)):
    return EstadoReporteController.delete(id_estado)
