# 🛡️ keepeR - Plataforma Unificada de Seguridad Ciudadana y Vecinal

¡Bienvenidos a **keepeR**! Este proyecto es el resultado de la integración y unificación de diferentes consolas de control y perfiles de seguridad en una sola plataforma interactiva, rápida y adaptable. Está diseñada para conectar a la comunidad y permitir tanto a los vecinos (usuarios) como a las fuerzas de emergencia del sector (**Policía, Bomberos y Ambulancias**) reportar incidentes, gestionar cuadrantes y coordinar acciones de manera inmediata.

Está construido como una **Aplicación de una Sola Página (SPA)** modular y de alto rendimiento usando tecnologías modernas.

##  Características Clave del Proyecto

1. **Multi-perfil Integrado:** Una sola pantalla de inicio de sesión da acceso a los 5 paneles de control específicos del sistema:
   * ** Policía:** Monitoreo de cuadrante, historial detallado de crímenes y gestión de patrullas.
   * ** Bomberos:** Despacho ante incendios, materiales peligrosos y emergencias estructurales.
   * ** Ambulancia:** Panel de urgencias médicas y control de traslados a centros de salud.
   * ** Administrador:** Panel integral (Feed) con control de usuarios, moderación de reportes y exportación en PDF.
   * ** (Usuario):** Panel de reporte ciudadano rápido, botón de pánico SOS y mapa de alertas activas.
2. **Buscador de Direcciones Nominatim:** Integrado en los mapas de todos los perfiles, permitiendo buscar direcciones o cuadrantes directamente en tiempo real.
3. **Diseño Líquido Responsivo (Mobile & TV Ready):** Eliminamos los límites de ancho fijo (`max-w`). Toda la interfaz se expande al 100% de pantalla, por lo que es perfecta tanto para el celular como para pantallas grandes o **televisores de monitoreo** en centros de comando.
4. **Alertas de Cierre Unificadas:** Los flujos de salida de todos los perfiles se han unificado y estilizado para garantizar una experiencia consistente y segura al cerrar sesión.

---

##  Estructura del Código y Organización

Organizamos el proyecto de forma modular para evitar archivos masivos y facilitar el mantenimiento de la aplicación:

```bash
Proyecto-Keeper-Unificado/
├── dist/                 # Carpeta autogenerada con el bundle optimizado para producción
├── node_modules/         # Dependencias de npm
├── public/               # Recursos estáticos servidos directamente (ej. favicon)
├── src/                  # Código fuente principal
│   ├── assets/           # Imágenes y logos optimizados
│   ├── components/       # Componentes interactivos e inicializadores de los perfiles
│   ├── data/             # Mock de datos para pruebas locales
│   ├── services/         # Servicios externos (geocodificación Nominatim, lógica de mapas)
│   ├── ui/               # Plantillas HTML minimalistas de las consolas de emergencia
│   ├── utils/            # Funciones auxiliares y formateadores de datos
│   ├── views/            # Vistas principales de la SPA
│   └── style.css         # Estilos globales y configuraciones personalizadas de Tailwind
├── CREDENTIALS.md        # Guía oficial con correos y claves de prueba
├── index.html            # Punto de entrada HTML principal
├── main.js               # Enrutador reactivo del flujo SPA
├── package.json          # Script de desarrollo, dependencias y librerías del proyecto
├── postcss.config.js     # Configuración para PostCSS
└── tailwind.config.js    # Configuración de Tailwind CSS (v4)
```

---

##  Descripción Detallada de Archivos

Para entender exactamente qué hace cada archivo dentro de nuestro flujo de desarrollo, aquí tienes la explicación detallada componente por componente:

###  Archivos de la Raíz del Proyecto
* **[main.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/main.js):** El enrutador y núcleo de la SPA. Escucha el estado de la sesión, intercepta las redirecciones del login, monta las vistas de forma dinámica en el contenedor `#app` e inicializa los controladores correspondientes.
* **[index.html](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/index.html):** Punto de entrada del navegador. Contiene el contenedor base `<div id="app">` donde se renderizan todas las páginas dinámicamente y las fuentes tipográficas.
* **[style.css](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/style.css):** Define los estilos globales del proyecto e integra Tailwind CSS v4 para procesar clases de utilidad.
* **[CREDENTIALS.md](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/CREDENTIALS.md):** Tabla explicativa de roles y credenciales (correos y contraseñas) asignadas para las pruebas de inicio de sesión.

###  Carpeta `src/components/` (Controladores e Interfaces de Flujo)
Contiene la lógica de comportamiento y la creación de diálogos emergentes con SweetAlert2:
* **[loginmodal.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/components/loginmodal.js):** Lógica que procesa las credenciales del usuario. Identifica qué tipo de rol ingresó (Policía, Bombero, Ambulancia, Administrador o Vecino) y bloquea el acceso con una alerta si el usuario no es válido.
* **[registermodal.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/components/registermodal.js):** Controla el flujo para registrar nuevos usuarios dentro del sistema, capturando y guardando sus datos básicos de contacto.
* **[reports.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/components/reports.js):** Maneja el modal de creación de alertas cotidianas (vandalismo, fallas eléctricas, etc.) que envían los vecinos desde el mapa principal.
* **[sos.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/components/sos.js):** El panel de pánico ciudadano. Despliega la opción para llamar de forma rápida a Policía, Bomberos o Médicos ante una emergencia crítica.
* **[lugaresmodal.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/components/lugaresmodal.js):** Permite a los usuarios marcar y visualizar "lugares seguros" o puntos comunitarios de interés en el mapa.
* **[perfilpolicia.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/components/perfilpolicia.js):** Controlador del dashboard de Policía. Gestiona la base de datos de incidentes policiales, conecta filtros de gravedad y fechas, inicializa el mapa con incidentes de tipo policial y maneja el modal de detalle de casos y evidencias.
* **[perfilbomberos.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/components/perfilbomberos.js):** Controlador del dashboard de Bomberos. Controla las alertas relativas a incendios, fugas y rescates, actualiza tablas y renderiza los estados de despacho.
* **[perfilambulancia.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/components/perfilambulancia.js):** Controlador del dashboard de Ambulancias. Gestiona el historial de incidentes médicos, estado de las unidades de rescate y la asignación de traslados a hospitales en tiempo real.

---

###  Carpeta `src/ui/` (Plantillas de Diseño de Emergencia)
Son los maquetados HTML estructurados con Tailwind CSS de las tres consolas operativas principales:
* **[templatePolicia.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/ui/templatePolicia.js):** Genera la estructura HTML del oficial de policía. Incluye los módulos de Estadísticas Estratégicas, Historial de Delitos en tabla y la Consola de Monitoreo en Mapa (limpia de textos innecesarios).
* **[templateBomberos.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/ui/templateBomberos.js):** Genera la estructura de la consola de despacho de bomberos, con indicadores rápidos de alarmas e incidentes activos.
* **[templateAmbulancia.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/ui/templateAmbulancia.js):** Genera la estructura visual de urgencias médicas, optimizada para ver el estado de las ambulancias en servicio.

---

### Carpeta `src/services/` (Servicios e Integraciones)
* **[mapService.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/services/mapService.js):** Centraliza la lógica de inicialización del mapa (Maplibre-GL), carga el estilo base, y se encarga de posicionar y repintar de forma reactiva los marcadores geográficos de acuerdo al filtro de incidentes seleccionado.
* **[findAddress.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/services/findAddress.js):** El buscador de direcciones Nominatim. Recibe el input de texto del buscador del mapa, realiza la petición a OpenStreetMap de forma asíncrona, y traslada el visor del mapa automáticamente a las coordenadas encontradas.

---

###  Carpeta `src/views/` (Vistas e Interfaces Principales)
* **[landingPage.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/views/landingPage.js):** Landing page de bienvenida. Es la página inicial de Keeper con información de las ventajas del sistema y el botón de acceso.
* **[homepage.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/views/homepage.js):** La vista principal del vecino. Aloja el mapa comunitario completo con buscador de direcciones, panel de contactos seguros y accesos rápidos a reportes y SOS.
* **[sidebar.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/views/sidebar.js):** Barra de navegación interactiva que permite a los operadores con privilegios de administración o soporte navegar entre pestañas de forma reactiva en los dashboards.

---

###  Carpeta `src/views/feed/` (Módulos de la Consola de Administración)
* **[feedState.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/views/feed/feedState.js):** Motor de estado local del administrador. Guarda los arreglos de usuarios registrados y reportes en cola de moderación.
* **[feedTemplate.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/views/feed/feedTemplate.js):** Maquetación HTML de la consola general de administración.
* **[feedUsers.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/views/feed/feedUsers.js):** Lógica y listeners para la tabla de gestión de usuarios (creación, edición y eliminación de roles de la red).
* **[feedReports.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/views/feed/feedReports.js):** Maneja la visualización y control de incidentes y las tablas de historial para la administración general.
* **[feedPdf.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/src/views/feed/feedPdf.js):** Lógica del generador de reportes consolidados en formato de impresión PDF.

---

##  Stack Tecnológico Utilizado

* **Vite (v8):** Nuestro empaquetador para recarga rápida en desarrollo y builds ligeros.
* **Tailwind CSS (v4):** Framework CSS modular basado en clases de utilidad que nos permite crear layouts 100% responsivos sin escribir CSS ad-hoc.
* **SweetAlert2:** Para los cuadros de diálogo, notificaciones y modales del flujo (como SOS, creación de reportes y confirmación de salida).
* **Maplibre-GL / OpenStreetMap:** Proveedor de mapas de código abierto para ubicar las alertas e incidentes geográficamente.
* **Nominatim API:** Para la búsqueda interactiva y traducción de direcciones a coordenadas en el buscador integrado.

---

##  Decisiones de Arquitectura Frontend

* **SPA (Single Page Application):** El enrutamiento se maneja directamente en [main.js](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/main.js) mediante la manipulación del contenedor `#app`. Esto hace que las transiciones entre la Landing Page, el Login y los Dashboards sean instantáneas, sin recargas de página.
* **Desacoplamiento UI/Controlador:** Las interfaces pesadas como las consolas de emergencia tienen su maquetación HTML separada en archivos de plantilla (`src/ui/template*.js`) y su lógica y listeners en sus respectivos componentes (`src/components/perfil*.js`).
* **Optimización de Ancho Líquido:** Cambiamos los antiguos límites fijos por layouts que se adaptan de forma natural al viewport actual de la pantalla. Esto asegura que en dispositivos grandes, como **televisores de salas de control**, la aplicación aproveche todo el espacio de visualización disponible.

---

##  Cómo Poner en Marcha el Proyecto

Asegúrate de tener instalado Node.js en tu equipo. Luego, sigue estos pasos:

1. **Instalar dependencias:**
   npm install
   

2. **Iniciar el servidor de desarrollo:**
   npm run dev

   *El servidor iniciará en un puerto disponible local (usualmente `http://localhost:5173` o `http://localhost:5174`).*

3. **Compilar para producción:**
   
   npm run build
   
   *Esto generará el bundle optimizado y minificado dentro de la carpeta `dist/` listo para producción.*

---

## 🔑 Cuentas de Prueba

Para probar los diferentes roles y accesos del sistema, puedes consultar la tabla detallada de correos y contraseñas en el archivo [CREDENTIALS.md](file:///C:/Users/Usuario/Desktop/Proyecto-Keeper-Unificado/CREDENTIALS.md) ubicado en la raíz del proyecto.