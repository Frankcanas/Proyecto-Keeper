from fastapi import APIRouter, Depends
from app.models.zona_favorita_model import ZonaFavoritaSchema
from app.controllers.zona_favorita_controller import ZonaFavoritaController
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/zonas", tags=["Zonas Favoritas"])

@router.post("/", status_code=201)
def crear_zona(datos: ZonaFavoritaSchema, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return ZonaFavoritaController.create(id_usuario, datos.dict())

@router.get("/")
def listar_zonas(payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return ZonaFavoritaController.get_all(id_usuario)

@router.get("/{id_zona}")
def obtener_zona(id_zona: int, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return ZonaFavoritaController.get_by_id(id_zona, id_usuario)

@router.put("/{id_zona}")
def actualizar_zona(id_zona: int, datos: ZonaFavoritaSchema, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return ZonaFavoritaController.update(id_zona, id_usuario, datos.dict(exclude_unset=True))

@router.delete("/{id_zona}")
def eliminar_zona(id_zona: int, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return ZonaFavoritaController.delete(id_zona, id_usuario)
