# Proyecto Keeper 

**Keeper** es una plataforma colaborativa de seguridad ciudadana y vecinal en tiempo real. Está diseñada para conectar a los miembros de la comunidad, permitiendo reportar incidentes, gestionar roles de seguridad (como Bomberos, Policía y Ambulancia) y visualizar la actividad del cuadrante mediante mapas interactivos y métricas analíticas.

Este proyecto está construido como una Aplicación de una Sola Página (SPA) utilizando tecnologías frontend modernas como **Vite**, **Tailwind CSS**, y **SweetAlert2**.

---

##  Estructura del Proyecto y Carpetas

A continuación se detalla el propósito y contenido de cada directorio en la rama actual (`feacture/lead-frontend-luigi`):

```bash
Proyecto-Keeper/
├── dist/                 # Carpeta autogenerada para producción (Vite build)
├── node_modules/         # Dependencias de Node.js
├── public/               # Archivos estáticos públicos no procesados por Vite
│   └── favicon.png       # Icono de la pestaña del navegador
├── src/                  # Directorio con el código fuente del proyecto
│   ├── assets/           # Imágenes y recursos estáticos multimedia
│   ├── components/       # Modales interactivos (SweetAlert2) reutilizables
│   └── views/            # Vistas principales de la aplicación (SPA)
│       └── feed/         # Módulos internos de la vista de Administración (Feed)
├── index.html            # Plantilla HTML de entrada
├── main.js               # Enrutador principal e inicializador del flujo SPA
├── package.json          # Configuración de dependencias y scripts de ejecución
├── postcss.config.js     # Configuración para el procesador CSS PostCSS
├── style.css             # Estilos globales y directivas de Tailwind
├── tailwind.config.js    # Configuración de estilos utilitarios de Tailwind CSS
└── vite.config.js        # Configuración del empaquetador Vite
```

---

##  Descripción Detallada de Carpetas y Componentes

### 1. `public/`
Contiene archivos estáticos que se copian tal cual al directorio de distribución final al construir el proyecto. Contiene el [favicon.png](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/public/favicon.png) de la plataforma.

### 2. `src/assets/`
Almacena recursos de imagen optimizados para el consumo interno de los componentes y vistas:
* **[hero.png](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/assets/hero.png):** Imagen principal para la sección de bienvenida (Hero) en la Landing Page.
* **[logo.png](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/assets/logo.png):** Logotipo institucional de Keeper.

### 3. `src/components/`
Módulos que encapsulan interfaces modales flotantes construidas con SweetAlert2 para la interacción de los usuarios:
* **[loginmodal.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/components/loginmodal.js):** Controla la autenticación de usuarios y redirige al panel administrativo.
* **[registermodal.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/components/registermodal.js):** Formulario para la auto-inscripción de vecinos en la red.
* **[reports.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/components/reports.js):** Modal para reportar incidentes estándar (Vandalismo, robo, fallas de energía) con opción de describir la situación.
* **[sos.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/components/sos.js):** Módulo crítico para el botón de pánico de emergencia (Policía, Bomberos y Ambulancia).
* **[lugaresmodal.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/components/lugaresmodal.js):** Modal para visualizar y agregar puntos de interés comunitario en el sector.

### 4. `src/views/`
Contiene los controladores y maquetadores de las vistas completas de la aplicación:
* **[homepage.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/views/homepage.js):** Vista para el usuario o vecino regular, donde puede ver alertas, interactuar con el botón SOS y crear reportes básicos.
* **[sidebar.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/views/sidebar.js):** Sidebar lateral de navegación que permite alternar pestañas de forma reactiva en el Panel de Administración.
* **[feed.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/views/feed.js):** Coordinador de la consola de administración. Enlaza los submódulos de la carpeta `feed/` con la inicialización del mapa y los eventos del navegador.

### 5. `src/views/feed/` *(Nueva estructura modular)*
Subcarpeta diseñada para evitar que el archivo de administración sea excesivamente grande y complejo:
* **[feedState.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/views/feed/feedState.js):** Motor de estado local. Almacena las listas reactivas de usuarios, la cola de moderación de reportes, el historial de incidentes y las estadísticas semanales.
* **[feedTemplate.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/views/feed/feedTemplate.js):** Aloja el diseño HTML y maquetación visual del dashboard completo de administración.
* **[feedUsers.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/views/feed/feedUsers.js):** Administra el CRUD de usuarios de la red (tabla, acciones en línea de modificación, y el modal SweetAlert2 para crear/editar usuarios con sus roles como Bombero, Policía, Administrador, Usuario y Ambulancia).
* **[feedReports.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/views/feed/feedReports.js):** Administra el renderizado y sincronización del estado de los reportes en la cola de moderación rápida y en la tabla del historial completo.
* **[feedPdf.js](file:///C:/Users/Usuario/Downloads/Diagramas/Proyecto/Proyecto-Keeper/src/views/feed/feedPdf.js):** Genera y exporta dinámicamente resúmenes ejecutivos a formato PDF con un diseño limpio para impresión.

---

## 🛠️ Tecnologías Utilizadas

* **Vite:** Compilador y servidor de desarrollo rápido para el frontend.
* **Tailwind CSS (v4):** Framework CSS basado en clases de utilidad para el diseño estético de interfaces.
* **SweetAlert2:** Framework de modales estilizados e interactivos para formularios y alertas.
* **OpenStreetMap (Nominatim API):** Servicio público geográfico integrado para la resolución de búsquedas de direcciones.

---

##  Cómo Ejecutar el Proyecto

Sigue estos sencillos pasos para correr el entorno de desarrollo local:

1. **Instalar Dependencias:**
   Usa npm para descargar e instalar todas las dependencias definidas en el `package.json`:
   ```bash
   npm install
   ```

2. **Correr en Modo Desarrollo:**
   Inicia el servidor local de desarrollo de Vite:
   ```bash
   npm run dev
   ```
   Abre tu navegador en la dirección provista por la terminal (usualmente `http://localhost:5173`).

3. **Construir para Producción:**
   Para empaquetar y optimizar el proyecto en la carpeta `dist/`:
   ```bash
   npm run build
   ```