# 🛡️ KeepeR - Backend API

Bienvenido al repositorio del backend de **KeepeR**, el sistema integral de reportes y alertas comunitarias. 
Este proyecto ha sido diseñado con una arquitectura sólida, escalable y segura, estructurada meticulosamente para facilitar el desarrollo en equipo.

---

## 🚀 Tecnologías Utilizadas

Este backend está construido sobre tecnologías modernas para garantizar un alto rendimiento y seguridad:

*   **Framework Principal:** [FastAPI](https://fastapi.tiangolo.com/) (Python) - Rápido, moderno y con documentación automática.
*   **Base de Datos:** PostgreSQL en la nube, alojada en [Neon](https://neon.tech/) (Serverless).
*   **Conexión a BD:** `psycopg2-binary` usando cursores tipo diccionario (`RealDictCursor`) para respuestas ágiles.
*   **Seguridad y Autenticación:**
    *   `passlib` y `bcrypt` para el hash criptográfico de contraseñas.
    *   `python-jose[cryptography]` para la emisión y validación de tokens JWT.
*   **Validación de Datos:** `pydantic` (V2) para reglas estrictas en cada petición HTTP.
*   **Servidor ASGI:** `uvicorn` para correr la aplicación en tiempo real.

---

## 📂 Arquitectura del Proyecto

El proyecto respeta estrictamente un patrón **MVC (Model-View-Controller)** adaptado a APIs, donde cada tabla de la base de datos cuenta con su propio flujo independiente:

```text
KeepeR
├── app
│   ├── config/        # Configuración de base de datos (db_config.py)
│   ├── models/        # Esquemas Pydantic para validar datos de entrada
│   ├── controllers/   # Lógica pura y ejecución de queries SQL a Neon
│   ├── router/        # Endpoints y protección de rutas con JWT
│   ├── utils/         # Utilidades (encriptación, manejo de tokens JWT)
│   └── main.py        # Archivo principal que levanta la app e incluye los routers
├── base de datos/     # Scripts y diagramas SQL
├── .env               # Variables de entorno (Credenciales de Neon y JWT)
└── requirements.txt   # Dependencias del proyecto
```

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo localmente.

### 1. Clonar y preparar el entorno
Abre tu terminal en la carpeta del proyecto y activa el entorno virtual (si no lo tienes, créalo con `py -m venv entornovirtual`):

**En Linux/Mac:**
```bash
source entornovirtual/bin/activate
```
**En Windows:**
```bash
entornovirtual\Scripts\activate
```

### 2. Instalar las dependencias
Con el entorno virtual activado, instala todas las librerías necesarias:
```bash
pip install -r requirements.txt
```

### 3. Configurar las Variables de Entorno
Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que `main.py` y este README). 
Dentro de este archivo, coloca tus credenciales (¡Pide a Valentina los accesos de la base de datos si no los tienes!):

```env
DB_USER=tu_usuario_neon
DB_PASSWORD=tu_password_neon
DB_HOST=tu_host_neon.neon.tech
DB_PORT=5432
DB_NAME=nombre_de_la_base

SECRET_KEY=una_clave_secreta_super_segura_para_los_tokens
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```
*(Nota: El archivo `.env` nunca debe subirse al repositorio)*

---

## ▶️ Ejecución del Servidor

Para encender el servidor y probar la API, asegúrate de estar dentro del entorno virtual y ejecuta:

```bash
uvicorn app.main:app --reload
```

*   `app.main:app` le indica a Uvicorn dónde está la instancia de FastAPI.
*   `--reload` hace que el servidor se reinicie automáticamente cada vez que guardas un cambio en el código.

Si todo está correcto, verás un mensaje en la consola indicando que el servidor está corriendo en `http://127.0.0.1:8000`.

---

## 📖 Explorar la Documentación Interactiva

¡La magia de FastAPI! No necesitas probar todo a ciegas. Una vez que el servidor esté corriendo, abre tu navegador y visita:

👉 **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

Verás la interfaz de **Swagger UI** con todos los módulos que hemos desarrollado perfectamente categorizados (Autenticación, Reportes, Alertas, SOS, etc.). 
Desde allí puedes probar el registro de usuarios, hacer login para obtener tu Token JWT y usarlo para acceder a las rutas protegidas.

---
*Desarrollado con mucha dedicación y esfuerzo. ❤️*
