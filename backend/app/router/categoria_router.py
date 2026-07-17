from fastapi import APIRouter, Depends
from app.models.categoria_model import CategoriaSchema
from app.controllers.categoria_controller import CategoriaController
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/categorias", tags=["Catálogos - Categorías"])

@router.post("/", status_code=201)
def crear_categoria(datos: CategoriaSchema, payload: dict = Depends(verify_token)):
    return CategoriaController.create(datos.dict())

@router.get("/")
def listar_categorias():
    # GET es público para que el frontend pueda cargar los selectores sin login
    return CategoriaController.get_all()

@router.get("/{id_categoria}")
def obtener_categoria(id_categoria: int):
    return CategoriaController.get_by_id(id_categoria)

@router.put("/{id_categoria}")
def actualizar_categoria(id_categoria: int, datos: CategoriaSchema, payload: dict = Depends(verify_token)):
    return CategoriaController.update(id_categoria, datos.dict(exclude_unset=True))

@router.delete("/{id_categoria}")
def eliminar_categoria(id_categoria: int, payload: dict = Depends(verify_token)):
    return CategoriaController.delete(id_categoria)
