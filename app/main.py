from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="KeepeR API",
    description="Backend para el sistema de reportes y alertas comunitarias",
    version="1.0.0"
)

# Configuración de CORS para que el frontend pueda conectarse
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambiar esto por la URL del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"mensaje": "Bienvenido a la API de KeepeR. Todo está funcionando correctamente."}

from app.router.rol_router import router as rol_router
app.include_router(rol_router)

from app.router.usuario_router import router as usuario_router
app.include_router(usuario_router)

from app.router.auth_router import router as auth_router
app.include_router(auth_router)

from app.router.reporte_router import router as reporte_router
app.include_router(reporte_router)

from app.router.contacto_confianza_router import router as contacto_router
app.include_router(contacto_router)

from app.router.zona_favorita_router import router as zona_router
app.include_router(zona_router)

from app.router.categoria_router import router as categoria_router
app.include_router(categoria_router)

from app.router.estado_reporte_router import router as estado_router
app.include_router(estado_router)

from app.router.servicio_emergencia_router import router as servicio_router
app.include_router(servicio_router)

from app.router.evidencia_router import router as evidencia_router
app.include_router(evidencia_router)

from app.router.validacion_router import router as validacion_router
app.include_router(validacion_router)

from app.router.confirmacion_comunitaria_router import router as confirmacion_router
app.include_router(confirmacion_router)

from app.router.alerta_router import router as alerta_router
app.include_router(alerta_router)

from app.router.sos_router import router as sos_router
app.include_router(sos_router)

from app.router.notificacion_router import router as notificacion_router
app.include_router(notificacion_router)

