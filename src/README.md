# Carpeta de Código Fuente (src) - keeperR 🛸🚑🔥

Esta carpeta contiene el código fuente principal de la aplicación **keeperR**, organizada bajo una arquitectura modular y limpia.

## 📂 Estructura de Directorios y Archivos

### 1. [components/](file:///C:/Users/USUARIO/Desktop/kepeer/Proyecto-Keeper/src/components)
Contiene las consolas tácticas individuales para cada uno de los servicios de respuesta a emergencias:
* **[perfilpolicia.js](file:///C:/Users/USUARIO/Desktop/kepeer/Proyecto-Keeper/src/components/perfilpolicia.js):** Consola táctica de la Policía Nacional. Interfaz y mapa diseñados en color verde militar.
* **[perfilbomberos.js](file:///C:/Users/USUARIO/Desktop/kepeer/Proyecto-Keeper/src/components/perfilbomberos.js):** Consola de despacho del Cuerpo de Bomberos. Interfaz y mapa diseñados en color rojo.
* **[perfilambulancia.js](file:///C:/Users/USUARIO/Desktop/kepeer/Proyecto-Keeper/src/components/perfilambulancia.js):** Consola médica para el servicio de Ambulancias. Interfaz y mapa diseñados en color azul, con filtros simplificados únicamente por rango de tiempo.

*Nota: Todas las consolas de componentes están preparadas con la estructura asíncrona `cargarReportesDesdeAPI` para facilitar la migración de datos locales a un servidor/API real.*

### 2. [main.js](file:///C:/Users/USUARIO/Desktop/kepeer/Proyecto-Keeper/src/main.js)
Punto de entrada principal de la aplicación.
* Renderiza el selector de roles del sistema de inicio (login moderno).
* Controla la transición visual del body (colores de fondo y acentos de selección).
* Enlaza y monta de forma limpia cada una de las consolas de servicio (`perfilpolicia`, `perfilbomberos`, `perfilambulancia`) sobre el contenedor `#app`.
* Gestiona la salida segura y desvinculación de los mapas de Leaflet para optimizar la memoria.

### 3. [style.css](file:///C:/Users/USUARIO/Desktop/kepeer/Proyecto-Keeper/src/style.css)
Estilos CSS personalizados aplicados globalmente a la aplicación:
* Animaciones y transiciones de carga.
* Reglas de diseño para la personalización de los popups oscuros e interactivos de Leaflet.js.
* Configuración de la barra de desplazamiento (`scrollbar`) personalizada.
