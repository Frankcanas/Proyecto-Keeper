from fastapi import APIRouter, Depends
from app.models.contacto_confianza_model import ContactoConfianzaSchema
from app.controllers.contacto_confianza_controller import ContactoConfianzaController
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/contactos", tags=["Contactos de Confianza"])

@router.post("/", status_code=201)
def crear_contacto(datos: ContactoConfianzaSchema, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return ContactoConfianzaController.create(id_usuario, datos.dict())

@router.get("/")
def listar_contactos(payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return ContactoConfianzaController.get_all(id_usuario)

@router.get("/{id_contacto}")
def obtener_contacto(id_contacto: int, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return ContactoConfianzaController.get_by_id(id_contacto, id_usuario)

@router.put("/{id_contacto}")
def actualizar_contacto(id_contacto: int, datos: ContactoConfianzaSchema, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return ContactoConfianzaController.update(id_contacto, id_usuario, datos.dict(exclude_unset=True))

@router.delete("/{id_contacto}")
def eliminar_contacto(id_contacto: int, payload: dict = Depends(verify_token)):
    id_usuario = int(payload.get("sub"))
    return ContactoConfianzaController.delete(id_contacto, id_usuario)
