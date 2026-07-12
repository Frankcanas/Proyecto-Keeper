import { renderFeedSidebar } from './sidebar.js';
import {findAddress} from '../services/findAddress.js';
import Swal from 'sweetalert2';

// Lista local de usuarios (reactiva en memoria)
let listUsers = [
  {
    id: 1,
    nombre: 'Luis',
    apellido: 'Morales',
    cedula: '1020304506',
    email: 'luis@keeper.com',
    telefono: '+57 320 530 2245',
    fechaNacimiento: '1995-04-12',
    rol: 'Administrador'
  },
  {
    id: 2,
    nombre: 'Marcus',
    apellido: 'J.',
    cedula: '1092834120',
    email: 'marcus@gmail.com',
    telefono: '+57 311 492 8815',
    fechaNacimiento: '1998-11-20',
    rol: 'Moderador'
  },
  {
    id: 3,
    nombre: 'Sarah',
    apellido: 'W.',
    cedula: '1045290381',
    email: 'sarah.w@outlook.com',
    telefono: '+57 315 283 9920',
    fechaNacimiento: '2000-07-05',
    rol: 'Usuario'
  }
];

// Lista local de reportes para la cola de moderacion en Estadisticas
let listReportesFeed = [
  {
    id: '#KP-8821',
    tipo: 'Vandalismo',
    reportadoPor: 'Marcus J.',
    fecha: 'Hace 2 min',
    estado: 'Pendiente',
    accion: '—'
  },
  {
    id: '#KP-8819',
    tipo: 'Vehículo Sospechoso',
    reportadoPor: 'Sarah W.',
    fecha: 'Hace 14 min',
    estado: 'En revisión',
    accion: '—'
  },
  {
    id: '#KP-8815',
    tipo: 'Falla de Energía',
    reportadoPor: 'Sensor Automático',
    fecha: 'Hace 42 min',
    estado: 'Completado',
    accion: '—'
  }
];

let showingThreeDays = false;

const data30Days = {
  trend: '+12.4% vs mes anterior',
  bars: ['60%', '70%', '50%', '80%', '90%', '60%', '70%'],
  active: '28',
  responseTime: '4m 12s',
  sectores: { norte: 42, central: 29, industrial: 64 },
  reports: [
    { id: '#KP-8821', tipo: 'Vandalismo', reportadoPor: 'Marcus J.', fecha: 'Hace 2 min', estado: 'Pendiente', accion: '—' },
    { id: '#KP-8819', tipo: 'Vehículo Sospechoso', reportadoPor: 'Sarah W.', fecha: 'Hace 14 min', estado: 'En revisión', accion: '—' },
    { id: '#KP-8815', tipo: 'Falla de Energía', reportadoPor: 'Sensor Automático', fecha: 'Hace 42 min', estado: 'Completado', accion: '—' }
  ]
};

const data3Days = {
  trend: '+18.2% vs semana anterior',
  bars: ['20%', '35%', '30%', '50%', '95%', '90%', '85%'],
  active: '9',
  responseTime: '2m 45s',
  sectores: { norte: 12, central: 8, industrial: 22 },
  reports: [
    { id: '#KP-8821', tipo: 'Vandalismo', reportadoPor: 'Marcus J.', fecha: 'Hace 2 min', estado: 'Pendiente', accion: '—' }
  ]
};

// Lista local para el Historial de Reportes Completo
let listHistorialReportes = [
  {
    id: '#KP-8821',
    tipo: 'Vandalismo',
    descripcion: 'Graffiti y rayados en la fachada del centro comunitario.',
    ubicacion: 'Calle 8 #12-42',
    fecha: 'Hace 2 min',
    estado: 'Pendiente',
    evidencia: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800',
    accion: '—'
  },
  {
    id: '#KP-8819',
    tipo: 'Vehículo Sospechoso',
    descripcion: 'Camioneta polarizada estacionada sospechosamente durante varias horas sin conductor.',
    ubicacion: 'Plaza Central',
    fecha: 'Hace 14 min',
    estado: 'En revisión',
    evidencia: null,
    accion: '—'
  },
  {
    id: '#KP-8815',
    tipo: 'Falla de Energía',
    descripcion: 'Corte total de suministro eléctrico en la manzana principal del cuadrante.',
    ubicacion: 'Zona Industrial',
    fecha: 'Hace 42 min',
    estado: 'Completado',
    evidencia: null,
    accion: '—'
  },
  {
    id: '#KP-8810',
    tipo: 'Robo a Mano Armada',
    descripcion: 'Asalto con arma de fuego a transeúnte cerca de la parada de autobús.',
    ubicacion: 'Avenida 42 #10-15',
    fecha: 'Hace 2 horas',
    estado: 'En revisión',
    evidencia: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
    accion: '—'
  }
];

export function renderFeed() {
  return `
    <section class="min-h-screen bg-[#f9fafb] text-zinc-900 font-sans">
      <div class="flex min-h-screen flex-col lg:flex-row">
        ${renderFeedSidebar()}

        <main class="flex-1 p-6 lg:p-8">
          <div class="mx-auto max-w-7xl">
            
            <!-- CONTENIDO TAB: ESTADÍSTICAS (El feed que tenemos actualmente) -->
            <div id="tab-content-estadisticas" class="hidden space-y-6">
              
              <!-- Header Section -->
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-2">
                <div>
                  <p class="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Monitoreo</p>
                  <h1 class="text-xl font-bold text-zinc-900 mt-1">Resumen Estratégico</h1>
                  <p class="text-xs text-zinc-500 mt-1">Seguimiento de incidentes en tiempo real y métricas de seguridad vecinal.</p>
                </div>
                <div class="flex gap-2">
                  <button id="btn-toggle-days" class="rounded border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors">Últimos 3 días</button>
                  <button id="btn-export-report" class="rounded bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors">Exportar reporte</button>
                </div>
              </div>

              <!-- Stats Grid -->
              <div class="grid gap-6 lg:grid-cols-3">
                
                <!-- Graph Card -->
                <div class="lg:col-span-2 bg-white border border-zinc-200 rounded-md p-6">
                  <div class="mb-6 flex items-center justify-between">
                    <p class="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Índice de Confianza Semanal</p>
                    <span id="stats-trend-percent" class="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">+12.4% vs mes anterior</span>
                  </div>
                  
                  <div class="relative h-48 pt-4">
                    <!-- Subtle background gridlines -->
                    <div class="absolute inset-x-0 top-4 bottom-6 flex flex-col justify-between pointer-events-none">
                      <div class="border-b border-zinc-100 w-full"></div>
                      <div class="border-b border-zinc-100 w-full"></div>
                      <div class="border-b border-zinc-100 w-full"></div>
                      <div class="border-b border-zinc-100 w-full"></div>
                    </div>

                    <!-- Graphic Bars -->
                    <div class="relative h-full flex items-end justify-between gap-3 z-10">
                      <div class="flex-1 flex flex-col items-center gap-2">
                        <div id="stats-bar-lun" class="w-full bg-zinc-200 rounded-t-sm hover:bg-zinc-300 transition-all duration-500" style="height: 60%"></div>
                        <span class="text-[9px] uppercase font-medium text-zinc-455">Lun</span>
                      </div>
                      <div class="flex-1 flex flex-col items-center gap-2">
                        <div id="stats-bar-mar" class="w-full bg-zinc-200 rounded-t-sm hover:bg-zinc-300 transition-all duration-500" style="height: 70%"></div>
                        <span class="text-[9px] uppercase font-medium text-zinc-455">Mar</span>
                      </div>
                      <div class="flex-1 flex flex-col items-center gap-2">
                        <div id="stats-bar-mie" class="w-full bg-zinc-200 rounded-t-sm hover:bg-zinc-300 transition-all duration-500" style="height: 50%"></div>
                        <span class="text-[9px] uppercase font-medium text-zinc-455">Mié</span>
                      </div>
                      <div class="flex-1 flex flex-col items-center gap-2">
                        <div id="stats-bar-jue" class="w-full bg-zinc-200 rounded-t-sm hover:bg-zinc-300 transition-all duration-500" style="height: 80%"></div>
                        <span class="text-[9px] uppercase font-medium text-zinc-455">Jue</span>
                      </div>
                      <div class="flex-1 flex flex-col items-center gap-2">
                        <div id="stats-bar-vie" class="w-full bg-zinc-900 rounded-t-sm hover:bg-zinc-950 transition-all duration-500" style="height: 90%"></div>
                        <span class="text-[9px] uppercase font-medium text-zinc-455">Vie</span>
                      </div>
                      <div class="flex-1 flex flex-col items-center gap-2">
                        <div id="stats-bar-sab" class="w-full bg-zinc-200 rounded-t-sm hover:bg-zinc-300 transition-all duration-500" style="height: 60%"></div>
                        <span class="text-[9px] uppercase font-medium text-zinc-455">Sáb</span>
                      </div>
                      <div class="flex-1 flex flex-col items-center gap-2">
                        <div id="stats-bar-dom" class="w-full bg-zinc-200 rounded-t-sm hover:bg-zinc-300 transition-all duration-500" style="height: 70%"></div>
                        <span class="text-[9px] uppercase font-medium text-zinc-455">Dom</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Indicators Sidecard -->
                <div class="flex flex-col gap-6">
                  
                  <!-- Dark Sidecard -->
                  <div class="bg-zinc-955 border border-zinc-800 rounded-md p-6 text-white flex flex-col justify-between">
                    <div class="flex items-start justify-between">
                      <div>
                        <p class="text-[9px] font-semibold uppercase tracking-wider text-zinc-450">Incidentes Activos</p>
                        <p id="stats-active-incidents" class="text-4xl font-bold mt-2">28</p>
                      </div>
                      <span class="inline-flex items-center gap-1.5 rounded bg-orange-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                        <span class="relative flex h-1.5 w-1.5">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </span>
                        En vivo
                      </span>
                    </div>
                    
                    <div class="mt-6 pt-4 border-t border-zinc-800">
                      <p class="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">Tiempo medio de respuesta</p>
                      <p id="stats-response-time" class="text-sm font-semibold mt-1">4m 12s</p>
                    </div>
                  </div>

                  <!-- Sector List Sidecard -->
                  <div class="bg-white border border-zinc-200 rounded-md p-6">
                    <p class="text-[9px] font-semibold uppercase tracking-wider text-zinc-400 mb-4">Incidentes por Sector</p>
                    <div class="space-y-3">
                      <div>
                        <div class="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                          <span>Sector Norte</span>
                          <span id="stats-sector-norte-count">42</span>
                        </div>
                        <div class="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                          <div id="stats-sector-norte-bar" class="h-full bg-zinc-850 rounded-full transition-all duration-500" style="width: 42%"></div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                          <span>Plaza Central</span>
                          <span id="stats-sector-central-count">29</span>
                        </div>
                        <div class="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                          <div id="stats-sector-central-bar" class="h-full bg-zinc-850 rounded-full transition-all duration-500" style="width: 29%"></div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                          <span>Zona Industrial</span>
                          <span id="stats-sector-industrial-count" class="text-orange-600">64</span>
                        </div>
                        <div class="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                          <div id="stats-sector-industrial-bar" class="h-full bg-[#ea580c] rounded-full transition-all duration-500" style="width: 64%"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Moderation Table Section -->
              <div class="bg-white border border-zinc-200 rounded-md p-6">
                <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 class="text-sm font-bold text-zinc-900">Cola de Moderación</h3>
                    <p class="text-xs text-zinc-500 mt-1">Filtrar y verificar reportes entrantes.</p>
                  </div>
                  <button id="btn-ver-historial" class="text-xs font-semibold text-[#ea580c] hover:underline transition-all">Ver todo el historial →</button>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs text-zinc-700 border-collapse">
                    <thead>
                      <tr class="border-b border-zinc-200 text-zinc-400 font-semibold uppercase tracking-wider text-[9px] pb-2">
                        <th class="pb-3 pr-4">ID</th>
                        <th class="pb-3 pr-4">Tipo</th>
                        <th class="pb-3 pr-4">Reportado Por</th>
                        <th class="pb-3 pr-4">Fecha/Hora</th>
                        <th class="pb-3 pr-4">Estado</th>
                        <th class="pb-3">Acción</th>
                      </tr>
                    </thead>
                    <tbody id="reportes-feed-table-body" class="divide-y divide-zinc-100">
                      <!-- Renderizado Dinámico de la Cola de Moderación -->
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            <!-- CONTENIDO TAB: USUARIOS -->
            <div id="tab-content-usuarios" class="hidden space-y-6">
              <!-- Header Section -->
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-2">
                <div>
                  <p class="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Comunidad</p>
                  <h1 class="text-xl font-bold text-zinc-900 mt-1">Gestión de Usuarios</h1>
                  <p class="text-xs text-zinc-500 mt-1">Administra los miembros de la red colaborativa de seguridad.</p>
                </div>
                <div>
                  <button id="btn-create-user" class="rounded bg-zinc-950 hover:bg-zinc-850 px-3 py-1.5 text-xs font-semibold text-white transition-colors">Nuevo Usuario</button>
                </div>
              </div>

              <!-- Users Table Card -->
              <div class="bg-white border border-zinc-200 rounded-md p-6">
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs text-zinc-700 border-collapse">
                    <thead>
                      <tr class="border-b border-zinc-200 text-zinc-400 font-semibold uppercase tracking-wider text-[9px] pb-2">
                        <th class="pb-3 pr-4">Nombre y Apellido</th>
                        <th class="pb-3 pr-4">Cédula</th>
                        <th class="pb-3 pr-4">Correo Electrónico</th>
                        <th class="pb-3 pr-4">Teléfono</th>
                        <th class="pb-3 pr-4">F. Nacimiento</th>
                        <th class="pb-3 pr-4">Rol</th>
                        <th class="pb-3 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody id="users-table-body" class="divide-y divide-zinc-100">
                      <!-- Renderizado Dinámico del CRUD -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- CONTENIDO TAB: REPORTES -->
            <div id="tab-content-reportes" class="hidden space-y-6">
              <!-- Header Section -->
              <div class="mb-2">
                <p class="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Seguridad</p>
                <h1 class="text-xl font-bold text-zinc-900 mt-1">Historial de Reportes</h1>
                <p class="text-xs text-zinc-500 mt-1">Listado completo de incidentes y problemas informados en el sector.</p>
              </div>

              <!-- Reports Table Card -->
              <div class="bg-white border border-zinc-200 rounded-md p-6">
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs text-zinc-700 border-collapse">
                    <thead>
                      <tr class="border-b border-zinc-200 text-zinc-400 font-semibold uppercase tracking-wider text-[9px] pb-2">
                        <th class="pb-3 pr-4">ID</th>
                        <th class="pb-3 pr-4">Tipo de Incidente</th>
                        <th class="pb-3 pr-4">Descripción</th>
                        <th class="pb-3 pr-4">Ubicación</th>
                        <th class="pb-3 pr-4">Fecha</th>
                        <th class="pb-3 pr-4">Estado</th>
                        <th class="pb-3 pr-4">Acción</th>
                        <th class="pb-3 text-right">Evidencia</th>
                      </tr>
                    </thead>
                    <tbody id="historial-reportes-table-body" class="divide-y divide-zinc-100">
                      <!-- Renderizado Dinámico del Historial de Reportes -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- CONTENIDO TAB: MAPA -->
            <div id="tab-content-mapa" class="space-y-6">
              <!-- Header Section -->
              <div class="mb-2">
                <p class="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Seguridad Vecinal</p>
                <h1 class="text-xl font-bold text-zinc-900 mt-1">Centro de Control y Monitoreo</h1>
                <p class="text-xs text-zinc-500 mt-1">Visualiza patrullas, reportes y geocercas en tiempo real sobre el mapa del sector.</p>
              </div>

              <!-- Map Container -->
              <div id="map" class="relative w-full h-[600px] rounded-lg border border-zinc-200 bg-zinc-950 overflow-hidden shadow-sm">
                
                <div class="absolute inset-0 z-0" h-full>
                  <!-- Imagen SVG elegante de calles como placeholder de fondo de mapa -->
                  <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#27272a_1px,_transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
                  
                  <svg viewBox="0 0 800 500" class="w-full h-full stroke-orange-500/10 fill-none pointer-events-none" stroke-width="1.5">
                    <!-- Calles ficticias -->
                    <path d="M 50,0 Q 200,150 400,200 T 750,500" stroke-width="8" stroke="rgba(234, 88, 12, 0.08)"/>
                    <path d="M 0,100 C 300,50 500,450 800,400" stroke-width="6" stroke="rgba(234, 88, 12, 0.05)"/>
                    <line x1="150" y1="0" x2="150" y2="500" stroke-width="3"/>
                    <line x1="500" y1="0" x2="500" y2="500" stroke-width="4"/>
                    <line x1="0" y1="250" x2="800" y2="250" stroke-width="4"/>
                    <!-- Zonas circulares ficticias -->
                    <circle cx="350" cy="220" r="80" stroke="#ea580c" stroke-width="1" stroke-dasharray="4 4" fill="rgba(234, 88, 12, 0.02)"/>
                    <circle cx="150" cy="120" r="50" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4 4" fill="rgba(59, 130, 246, 0.02)"/>
                  </svg>
                  
                  <!-- Mensaje para el desarrollador -->
                  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div class="bg-zinc-900/90 border border-zinc-800 rounded p-4 text-center max-w-sm">
                      <p class="text-xs font-bold text-white uppercase tracking-wider mb-1">Área para Mapa Interactivo</p>
                      <p class="text-[10px] text-zinc-400">Contenedor listo con ID <code class="text-orange-400">#map</code>. Puedes montar Leaflet, Google Maps o Mapbox aquí.</p>
                    </div>
                  </div>
                </div>

                <!-- Barra de búsqueda superior flotante -->
                <div class="absolute top-4 left-4 right-4 md:left-6 md:right-auto md:w-96 z-10 flex gap-2">
                  <div class="relative w-full">
                    <input id="map-search-input" type="text" placeholder="Buscar dirección, cuadrante o patrulla..." class="w-full pl-9 pr-4 py-2 border border-zinc-800 bg-zinc-900/95 text-white rounded text-xs focus:outline-none focus:border-orange-500 shadow-lg backdrop-blur-sm placeholder-zinc-500">
                    <svg class="h-3.5 w-3.5 text-zinc-500 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                <!-- Panel Flotante de Leyendas / Controles a la derecha -->
                <div class="absolute top-4 right-4 z-10 w-64 bg-zinc-900/95 border border-zinc-800 rounded p-4 text-white shadow-lg backdrop-blur-sm space-y-4">
                  <div>
                    <h3 class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Filtros de Capas</h3>
                    <div class="space-y-2">
                      <label class="flex items-center justify-between cursor-pointer">
                        <span class="text-xs text-zinc-300">Mostrar Patrullas</span>
                        <input type="checkbox" checked class="accent-orange-500 rounded bg-zinc-800 border-zinc-700">
                      </label>
                      <label class="flex items-center justify-between cursor-pointer">
                        <span class="text-xs text-zinc-300">Cámaras de Vigilancia</span>
                        <input type="checkbox" checked class="accent-orange-500 rounded bg-zinc-800 border-zinc-700">
                      </label>
                      <label class="flex items-center justify-between cursor-pointer">
                        <span class="text-xs text-zinc-300">Reportes de Incidentes</span>
                        <input type="checkbox" checked class="accent-orange-500 rounded bg-zinc-800 border-zinc-700">
                      </label>
                    </div>
                  </div>

                  <div class="border-t border-zinc-800 pt-3">
                    <h3 class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Métricas Rápidas</h3>
                    <div class="grid grid-cols-2 gap-2 text-center text-xs">
                      <div class="bg-zinc-950 p-2 rounded border border-zinc-800">
                        <div class="text-[9px] text-zinc-500 uppercase">Cámaras</div>
                        <div class="text-xs font-bold text-emerald-400">12/12</div>
                      </div>
                      <div class="bg-zinc-950 p-2 rounded border border-zinc-800">
                        <div class="text-[9px] text-zinc-500 uppercase">Patrullas</div>
                        <div class="text-xs font-bold text-orange-400">4 Activas</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Indicador de señal / Estado de conexión en la parte inferior izquierda -->
                <div class="absolute bottom-4 left-4 z-10 bg-zinc-950/90 border border-zinc-800 rounded px-2.5 py-1 flex items-center gap-2 text-white shadow-lg backdrop-blur-sm">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span class="text-[9px] font-bold tracking-wide uppercase text-zinc-300">Conexión Live: GPS Activo</span>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </section>
  `;
}

function renderReportesFeedTable() {
  const tbody = document.getElementById('reportes-feed-table-body');
  if (!tbody) return;

  tbody.innerHTML = listReportesFeed.map(report => `
    <tr class="hover:bg-zinc-50/50 transition-colors">
      <td class="py-4 pr-4 font-semibold text-zinc-955">${report.id}</td>
      <td class="py-4 pr-4 text-zinc-800 font-medium">${report.tipo}</td>
      <td class="py-4 pr-4 text-zinc-500">${report.reportadoPor}</td>
      <td class="py-4 pr-4 text-zinc-500">${report.fecha}</td>
      <td class="py-4 pr-4">
        <select data-id="${report.id}" class="select-report-estado text-[10px] font-semibold border rounded px-2 py-0.5 cursor-pointer focus:outline-none ${
          report.estado === 'Pendiente' ? 'bg-orange-50 text-orange-700 border-orange-200' :
          report.estado === 'En revisión' ? 'bg-blue-50 text-blue-700 border-blue-200' :
          'bg-emerald-50 text-emerald-700 border-emerald-200'
        }">
          <option value="Pendiente" ${report.estado === 'Pendiente' ? 'selected' : ''} class="bg-white text-zinc-800">Pendiente</option>
          <option value="En revisión" ${report.estado === 'En revisión' ? 'selected' : ''} class="bg-white text-zinc-800">En revisión</option>
          <option value="Completado" ${report.estado === 'Completado' ? 'selected' : ''} class="bg-white text-zinc-800">Completado</option>
        </select>
      </td>
      <td class="py-4 font-medium ${report.accion !== '—' ? 'text-zinc-855 font-semibold' : 'text-zinc-400'}">${report.accion}</td>
    </tr>
  `).join('');

  // Escuchar cambios de estado
  document.querySelectorAll('.select-report-estado').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = select.dataset.id;
      const report = listReportesFeed.find(r => r.id === id);
      if (report) {
        report.estado = e.target.value;
        report.accion = 'Luis Morales'; // Usuario que inició sesión y realizó la modificación
        renderReportesFeedTable();

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `Reporte ${id} actualizado por Luis Morales`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: { popup: 'rounded border border-zinc-200 bg-white font-sans text-xs' }
        });
      }
    });
  });
}

function renderHistorialReportesTable() {
  const tbody = document.getElementById('historial-reportes-table-body');
  if (!tbody) return;

  tbody.innerHTML = listHistorialReportes.map(report => `
    <tr class="hover:bg-zinc-50/50 transition-colors">
      <td class="py-4 pr-4 font-semibold text-zinc-955">${report.id}</td>
      <td class="py-4 pr-4 text-zinc-800 font-medium">${report.tipo}</td>
      <td class="py-4 pr-4 text-zinc-650 max-w-xs truncate font-medium" title="${report.descripcion || '—'}">${report.descripcion || '—'}</td>
      <td class="py-4 pr-4 text-zinc-500">${report.ubicacion}</td>
      <td class="py-4 pr-4 text-zinc-500">${report.fecha}</td>
      <td class="py-4 pr-4">
        <select data-id="${report.id}" class="select-historial-estado text-[10px] font-semibold border rounded px-2 py-0.5 cursor-pointer focus:outline-none ${
          report.estado === 'Pendiente' ? 'bg-orange-50 text-orange-700 border-orange-200' :
          report.estado === 'En revisión' ? 'bg-blue-50 text-blue-700 border-blue-200' :
          'bg-emerald-50 text-emerald-700 border-emerald-200'
        }">
          <option value="Pendiente" ${report.estado === 'Pendiente' ? 'selected' : ''} class="bg-white text-zinc-800">Pendiente</option>
          <option value="En revisión" ${report.estado === 'En revisión' ? 'selected' : ''} class="bg-white text-zinc-800">En revisión</option>
          <option value="Completado" ${report.estado === 'Completado' ? 'selected' : ''} class="bg-white text-zinc-800">Completado</option>
        </select>
      </td>
      <td class="py-4 pr-4 font-medium ${report.accion !== '—' ? 'text-zinc-855 font-semibold' : 'text-zinc-400'}">${report.accion}</td>
      <td class="py-4 text-right whitespace-nowrap">
        ${report.evidencia ? `
          <button data-url="${report.evidencia}" class="btn-view-evidence text-[#ea580c] hover:text-[#c2410c] font-semibold hover:underline">Ver adjunto</button>
        ` : '<span class="text-zinc-400">—</span>'}
      </td>
    </tr>
  `).join('');

  // Escuchar cambios de estado
  document.querySelectorAll('.select-historial-estado').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = select.dataset.id;
      const report = listHistorialReportes.find(r => r.id === id);
      if (report) {
        report.estado = e.target.value;
        report.accion = 'Luis Morales'; // Usuario que inició sesión y realizó la modificación
        renderHistorialReportesTable();

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `Reporte ${id} actualizado por Luis Morales`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: { popup: 'rounded border border-zinc-200 bg-white font-sans text-xs' }
        });
      }
    });
  });

  // Escuchar clics en evidencia
  document.querySelectorAll('.btn-view-evidence').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.url;
      Swal.fire({
        title: '<div class="text-left"><span class="text-[10px] uppercase tracking-wider font-bold text-zinc-550">Evidencia Cargada</span></div>',
        imageUrl: url,
        imageAlt: 'Evidencia del reporte',
        imageWidth: 400,
        imageHeight: 250,
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
          popup: 'rounded-md p-6 border border-zinc-200 bg-white max-w-sm w-full font-sans'
        }
      });
    });
  });
}

// -------------------------------------------------------------
// CRUD: USUARIOS
// -------------------------------------------------------------
function renderUsersTable() {
  const tbody = document.getElementById('users-table-body');
  if (!tbody) return;

  if (listUsers.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-zinc-400 font-medium">No hay usuarios registrados.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = listUsers.map(user => `
    <tr class="hover:bg-zinc-50/50 transition-colors">
      <td class="py-4 pr-4 font-semibold text-zinc-900">${user.nombre} ${user.apellido}</td>
      <td class="py-4 pr-4 text-zinc-500 font-mono">${user.cedula}</td>
      <td class="py-4 pr-4 text-zinc-500">${user.email}</td>
      <td class="py-4 pr-4 text-zinc-500">${user.telefono}</td>
      <td class="py-4 pr-4 text-zinc-500">${user.fechaNacimiento}</td>
      <td class="py-4 pr-4">
        <select data-id="${user.id}" class="select-user-rol-inline text-[10px] font-semibold border rounded px-2.5 py-1 cursor-pointer focus:outline-none ${
          user.rol === 'Administrador' ? 'bg-purple-50 text-purple-750 border-purple-200' :
          user.rol === 'Moderador' ? 'bg-blue-50 text-blue-755 border-blue-200' :
          'bg-zinc-50 text-zinc-650 border-zinc-200'
        }">
          <option value="Usuario" ${user.rol === 'Usuario' ? 'selected' : ''} class="bg-white text-zinc-800">Usuario</option>
          <option value="Moderador" ${user.rol === 'Moderador' ? 'selected' : ''} class="bg-white text-zinc-800">Moderador</option>
          <option value="Administrador" ${user.rol === 'Administrador' ? 'selected' : ''} class="bg-white text-zinc-800">Administrador</option>
        </select>
      </td>
      <td class="py-4 text-right space-x-2 font-bold text-[11px] whitespace-nowrap">
        <button data-id="${user.id}" class="btn-user-edit inline-flex items-center gap-1 rounded border border-zinc-200 hover:bg-zinc-50 text-zinc-700 px-2.5 py-1 text-[10px] font-bold transition-colors">
          <svg class="h-3 w-3 text-zinc-450" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>Actualizar</span>
        </button>
        <button data-id="${user.id}" class="btn-user-delete inline-flex items-center gap-1 rounded border border-red-100 hover:bg-red-50 text-red-650 px-2.5 py-1 text-[10px] font-bold transition-colors">
          <svg class="h-3 w-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Eliminar</span>
        </button>
      </td>
    </tr>
  `).join('');

  attachUserActions();
}

function attachUserActions() {
  // Manejo de cambio de rol inline directamente desde la tabla
  document.querySelectorAll('.select-user-rol-inline').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = parseInt(select.dataset.id);
      const user = listUsers.find(u => u.id === id);
      if (user) {
        const newRol = e.target.value;
        user.rol = newRol;
        renderUsersTable(); // Refrescar para actualizar clases de color del select

        Swal.fire({
          icon: 'success',
          title: '<h3 class="text-xs font-semibold text-zinc-900 text-left">Rol Modificado</h3>',
          html: `<p class="text-[11px] text-zinc-500 text-left">El rol de <strong>${user.nombre}</strong> ahora es <strong>${newRol}</strong>.</p>`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          customClass: { popup: 'rounded-md p-4 border border-zinc-200 bg-white max-w-xs' }
        });
      }
    });
  });

  document.querySelectorAll('.btn-user-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const user = listUsers.find(u => u.id === id);
      if (user) openUserFormModal(user);
    });
  });

  document.querySelectorAll('.btn-user-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const user = listUsers.find(u => u.id === id);
      if (!user) return;

      Swal.fire({
        title: '<h3 class="text-sm font-semibold text-zinc-900 text-left">Confirmar Eliminación</h3>',
        html: `<p class="text-xs text-zinc-500 text-left">¿Estás seguro de que deseas eliminar permanentemente a <strong>${user.nombre} ${user.apellido}</strong> de la red vecinal?</p>`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        customClass: {
          popup: 'rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full font-sans',
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors mr-2',
          cancelButton: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold px-3 py-1.5 rounded transition-colors'
        }
      }).then(result => {
        if (result.isConfirmed) {
          listUsers = listUsers.filter(u => u.id !== id);
          renderUsersTable();
          
          Swal.fire({
            icon: 'success',
            title: '<h3 class="text-sm font-semibold text-zinc-900 text-left">Usuario Eliminado</h3>',
            html: '<p class="text-xs text-zinc-500 text-left">El miembro ha sido removido con éxito de la lista.</p>',
            showConfirmButton: false,
            timer: 2000,
            buttonsStyling: false,
            customClass: { popup: 'rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full' }
          });
        }
      });
    });
  });
}

function openUserFormModal(user = null) {
  Swal.fire({
    title: `<div class="text-left font-sans"><h3 class="text-base font-semibold text-zinc-900">${user ? 'Editar Usuario' : 'Nuevo Usuario'}</h3><p class="text-zinc-500 mt-1 text-xs leading-relaxed">Completa todos los campos requeridos del registro.</p></div>`,
    html: `
      <form id="swal-user-crud-form" class="space-y-4 mt-4 text-left font-sans">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Nombre</label>
            <input id="user-nombre" type="text" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 placeholder-zinc-400 bg-white" placeholder="Ej. Juan" value="${user ? user.nombre : ''}">
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Apellido</label>
            <input id="user-apellido" type="text" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 placeholder-zinc-400 bg-white" placeholder="Ej. Pérez" value="${user ? user.apellido : ''}">
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Cédula de Identidad</label>
          <input id="user-cedula" type="text" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 placeholder-zinc-400 bg-white" placeholder="Número de cédula" value="${user ? user.cedula : ''}">
        </div>

        <div>
          <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Correo electrónico</label>
          <input id="user-email" type="email" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 placeholder-zinc-400 bg-white" placeholder="tu@email.com" value="${user ? user.email : ''}">
        </div>

        <div>
          <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Teléfono</label>
          <input id="user-telefono" type="tel" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 placeholder-zinc-400 bg-white" placeholder="Ej. +57 320 530 22 45" value="${user ? user.telefono : ''}">
        </div>

        <div>
          <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Fecha de nacimiento</label>
          <input id="user-fecha-nacimiento" type="date" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 bg-white" value="${user ? user.fechaNacimiento : ''}">
        </div>

        <div>
          <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Rol</label>
          <select id="user-rol" class="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 bg-white">
            <option value="Usuario" ${user && user.rol === 'Usuario' ? 'selected' : ''}>Usuario</option>
            <option value="Moderador" ${user && user.rol === 'Moderador' ? 'selected' : ''}>Moderador</option>
            <option value="Administrador" ${user && user.rol === 'Administrador' ? 'selected' : ''}>Administrador</option>
          </select>
        </div>

        ${!user ? `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="relative">
            <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Contraseña</label>
            <input id="user-password" type="password" class="w-full pl-3 pr-8 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 placeholder-zinc-400 bg-white" placeholder="Mínimo 8 caracteres">
            <button type="button" id="toggle-user-password" class="absolute right-2.5 top-[23px] text-zinc-400 hover:text-zinc-600 transition-colors flex items-center justify-center h-6 w-6">
              <svg id="eye-open-1" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg id="eye-closed-1" class="h-4 w-4 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            </button>
          </div>
          <div class="relative">
            <label class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Confirmar contraseña</label>
            <input id="user-password-confirm" type="password" class="w-full pl-3 pr-8 py-2 border border-zinc-200 rounded focus:outline-none focus:border-zinc-400 text-xs text-zinc-800 placeholder-zinc-400 bg-white" placeholder="Repetir contraseña">
            <button type="button" id="toggle-user-password-confirm" class="absolute right-2.5 top-[23px] text-zinc-400 hover:text-zinc-600 transition-colors flex items-center justify-center h-6 w-6">
              <svg id="eye-open-2" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg id="eye-closed-2" class="h-4 w-4 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            </button>
          </div>
        </div>
        ` : ''}

        <div id="user-modal-error" class="text-xs font-semibold text-red-500 text-center"></div>

        <button id="user-modal-submit" type="button" class="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium py-2.5 rounded text-xs transition-colors mt-2 uppercase tracking-wider font-semibold">
          ${user ? 'Guardar Cambios' : 'Crear Usuario'}
        </button>
      </form>
    `,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    buttonsStyling: false,
    customClass: {
      popup: 'rounded-md p-6 border border-zinc-200 bg-white max-w-md w-full font-sans',
      cancelButton: 'w-full mt-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold py-2 rounded transition-colors text-center'
    },
    didOpen: () => {
      const submitBtn = document.getElementById('user-modal-submit');
      const errorEl = document.getElementById('user-modal-error');

      // Control de visibilidad de contraseñas
      const togglePassBtn1 = document.getElementById('toggle-user-password');
      const passInput1 = document.getElementById('user-password');
      const eyeOpen1 = document.getElementById('eye-open-1');
      const eyeClosed1 = document.getElementById('eye-closed-1');

      togglePassBtn1?.addEventListener('click', () => {
        if (passInput1.type === 'password') {
          passInput1.type = 'text';
          eyeOpen1.classList.add('hidden');
          eyeClosed1.classList.remove('hidden');
        } else {
          passInput1.type = 'password';
          eyeOpen1.classList.remove('hidden');
          eyeClosed1.classList.add('hidden');
        }
      });

      const togglePassBtn2 = document.getElementById('toggle-user-password-confirm');
      const passInput2 = document.getElementById('user-password-confirm');
      const eyeOpen2 = document.getElementById('eye-open-2');
      const eyeClosed2 = document.getElementById('eye-closed-2');

      togglePassBtn2?.addEventListener('click', () => {
        if (passInput2.type === 'password') {
          passInput2.type = 'text';
          eyeOpen2.classList.add('hidden');
          eyeClosed2.classList.remove('hidden');
        } else {
          passInput2.type = 'password';
          eyeOpen2.classList.remove('hidden');
          eyeClosed2.classList.add('hidden');
        }
      });

      submitBtn.addEventListener('click', () => {
        const nombre = document.getElementById('user-nombre').value.trim();
        const apellido = document.getElementById('user-apellido').value.trim();
        const cedula = document.getElementById('user-cedula').value.trim();
        const email = document.getElementById('user-email').value.trim();
        const telefono = document.getElementById('user-telefono').value.trim();
        const fechaNacimiento = document.getElementById('user-fecha-nacimiento').value;
        const rol = document.getElementById('user-rol').value;

        if (!nombre || !apellido || !cedula || !email || !telefono || !fechaNacimiento) {
          errorEl.textContent = 'Por favor, complete todos los campos.';
          return;
        }

        if (!user) {
          const password = document.getElementById('user-password').value;
          const confirmPassword = document.getElementById('user-password-confirm').value;

          if (password.length < 8) {
            errorEl.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            return;
          }
          if (password !== confirmPassword) {
            errorEl.textContent = 'Las contraseñas no coinciden.';
            return;
          }
        }

        if (user) {
          user.nombre = nombre;
          user.apellido = apellido;
          user.cedula = cedula;
          user.email = email;
          user.telefono = telefono;
          user.fechaNacimiento = fechaNacimiento;
          user.rol = rol;
        } else {
          const newUser = {
            id: Date.now(),
            nombre,
            apellido,
            cedula,
            email,
            telefono,
            fechaNacimiento,
            rol
          };
          listUsers.push(newUser);
        }

        renderUsersTable();
        Swal.close();

        Swal.fire({
          icon: 'success',
          title: `<h3 class="text-sm font-semibold text-zinc-900 text-left">${user ? 'Usuario Actualizado' : 'Usuario Creado'}</h3>`,
          html: `<p class="text-xs text-zinc-500 text-left">El miembro ha sido ${user ? 'modificado' : 'añadido'} exitosamente.</p>`,
          showConfirmButton: false,
          timer: 2000,
          buttonsStyling: false,
          customClass: { popup: 'rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full' }
        });
      });
    }
  });
}

// -------------------------------------------------------------
// CONTROLADOR DE PESTAÑAS (TABS)
// -------------------------------------------------------------
export function initFeed() {
  const btnUsuarios = document.getElementById('sidebar-btn-usuarios');
  const btnReportes = document.getElementById('sidebar-btn-reportes');
  const btnEstadisticas = document.getElementById('sidebar-btn-estadisticas');
  const btnMapa = document.getElementById('sidebar-btn-mapa');

  const tabEstadisticas = document.getElementById('tab-content-estadisticas');
  const tabUsuarios = document.getElementById('tab-content-usuarios');
  const tabReportes = document.getElementById('tab-content-reportes');
  const tabMapa = document.getElementById('tab-content-mapa');

  // Inicializar renderizado de tablas
  renderUsersTable();
  renderReportesFeedTable();
  renderHistorialReportesTable();

  // Conectar botones de creación de cabeceras
  const createBtn = document.getElementById('btn-create-user');
  if (createBtn) {
    createBtn.addEventListener('click', () => openUserFormModal());
  }

  // Conectar botón "Ver todo el historial" en Estadísticas
  const btnVerHistorial = document.getElementById('btn-ver-historial');
  if (btnVerHistorial) {
    btnVerHistorial.addEventListener('click', () => {
      switchTab(btnReportes, tabReportes);
    });
  }

  // Conectar botón de alternancia Últimos 3 días / 30 días
  const btnToggleDays = document.getElementById('btn-toggle-days');
  btnToggleDays?.addEventListener('click', () => {
    showingThreeDays = !showingThreeDays;
    const currentData = showingThreeDays ? data3Days : data30Days;
    
    // Cambiar texto del botón
    btnToggleDays.textContent = showingThreeDays ? 'Últimos 30 días' : 'Últimos 3 días';
    
    // Actualizar tendencia
    const trendEl = document.getElementById('stats-trend-percent');
    if (trendEl) trendEl.textContent = currentData.trend;
    
    // Actualizar incidentes activos y tiempo de respuesta
    const activeEl = document.getElementById('stats-active-incidents');
    if (activeEl) activeEl.textContent = currentData.active;
    
    const responseEl = document.getElementById('stats-response-time');
    if (responseEl) responseEl.textContent = currentData.responseTime;
    
    // Actualizar barras del gráfico semanal
    const barIds = ['stats-bar-lun', 'stats-bar-mar', 'stats-bar-mie', 'stats-bar-jue', 'stats-bar-vie', 'stats-bar-sab', 'stats-bar-dom'];
    barIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.style.height = currentData.bars[i];
    });
    
    // Actualizar sectores
    const norteCount = document.getElementById('stats-sector-norte-count');
    const norteBar = document.getElementById('stats-sector-norte-bar');
    if (norteCount && norteBar) {
      norteCount.textContent = currentData.sectores.norte;
      norteBar.style.width = `${currentData.sectores.norte}%`;
    }
    
    const centralCount = document.getElementById('stats-sector-central-count');
    const centralBar = document.getElementById('stats-sector-central-bar');
    if (centralCount && centralBar) {
      currentData.sectores.central; // wait, let's set textContent
      centralCount.textContent = currentData.sectores.central;
      centralBar.style.width = `${currentData.sectores.central}%`;
    }
    
    const industrialCount = document.getElementById('stats-sector-industrial-count');
    const industrialBar = document.getElementById('stats-sector-industrial-bar');
    if (industrialCount && industrialBar) {
      industrialCount.textContent = currentData.sectores.industrial;
      industrialBar.style.width = `${currentData.sectores.industrial}%`;
    }
    
    // Actualizar cola de moderación
    listReportesFeed = JSON.parse(JSON.stringify(currentData.reports));
    renderReportesFeedTable();

    // Notificación toast informativa
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: `Visualizando datos de los ${showingThreeDays ? 'últimos 3 días' : 'últimos 30 días'}`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: { popup: 'rounded border border-zinc-200 bg-white font-sans text-xs' }
    });
  });

  // Conectar botón de exportar reporte
  const btnExportReport = document.getElementById('btn-export-report');
  if (btnExportReport) {
    btnExportReport.addEventListener('click', () => {
      exportReportToPDF();
    });
  }

  const buttons = [
    { btn: btnUsuarios, tab: tabUsuarios },
    { btn: btnReportes, tab: tabReportes },
    { btn: btnEstadisticas, tab: tabEstadisticas },
    { btn: btnMapa, tab: tabMapa }
  ];

  function switchTab(activeBtn, activeTab) {
    buttons.forEach(item => {
      if (item.btn && item.tab) {
        if (item.btn === activeBtn) {
          item.btn.className = "sidebar-nav-btn flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-xs font-medium bg-zinc-900 text-white border border-zinc-800";
          const icon = item.btn.querySelector('svg');
          if (icon) {
            icon.classList.remove('text-zinc-550', 'text-zinc-500');
            icon.classList.add('text-zinc-400');
          }
          item.tab.classList.remove('hidden');
        } else {
          item.btn.className = "sidebar-nav-btn flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900/50";
          const icon = item.btn.querySelector('svg');
          if (icon) {
            icon.classList.remove('text-zinc-400');
            icon.classList.add('text-zinc-550');
          }
          item.tab.classList.add('hidden');
        }
      }
    });
  }

  if (btnUsuarios) btnUsuarios.addEventListener('click', () => switchTab(btnUsuarios, tabUsuarios));
  if (btnReportes) btnReportes.addEventListener('click', () => switchTab(btnReportes, tabReportes));
  if (btnEstadisticas) btnEstadisticas.addEventListener('click', () => switchTab(btnEstadisticas, tabEstadisticas));
  if (btnMapa) btnMapa.addEventListener('click', () => switchTab(btnMapa, tabMapa));

  // Buscador de direcciones en el mapa (Nominatim)
  const mapSearchInput = document.getElementById('map-search-input');
  findAddress(mapSearchInput);
}

function exportReportToPDF() {
  const currentRange = showingThreeDays ? 'Últimos 3 días' : 'Últimos 30 días';
  const activeIncidents = document.getElementById('stats-active-incidents')?.textContent || '28';
  const responseTime = document.getElementById('stats-response-time')?.textContent || '4m 12s';
  const trend = document.getElementById('stats-trend-percent')?.textContent || '+12.4% vs mes anterior';
  
  const secNorte = document.getElementById('stats-sector-norte-count')?.textContent || '42';
  const secCentral = document.getElementById('stats-sector-central-count')?.textContent || '29';
  const secIndustrial = document.getElementById('stats-sector-industrial-count')?.textContent || '64';

  let tableRowsHtml = '';
  listReportesFeed.forEach(r => {
    tableRowsHtml += `
      <tr style="border-bottom: 1px solid #e4e4e7;">
        <td style="padding: 10px 0; font-family: monospace; font-weight: bold; color: #18181b;">${r.id}</td>
        <td style="padding: 10px 0; color: #27272a;">${r.tipo}</td>
        <td style="padding: 10px 0; color: #71717a;">${r.reportadoPor}</td>
        <td style="padding: 10px 0; color: #71717a;">${r.fecha}</td>
        <td style="padding: 10px 0;">
          <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; border: 1px solid #e4e4e7;
            background: ${r.estado === 'Pendiente' ? '#fff7ed' : r.estado === 'En revisión' ? '#eff6ff' : '#f0fdf4'};
            color: ${r.estado === 'Pendiente' ? '#c2410c' : r.estado === 'En revisión' ? '#1d4ed8' : '#15803d'};">
            ${r.estado}
          </span>
        </td>
        <td style="padding: 10px 0; font-weight: 500; color: #3f3f46;">${r.accion}</td>
      </tr>
    `;
  });

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    Swal.fire({
      icon: 'warning',
      title: '<h3 class="text-sm font-semibold text-zinc-900 text-left">Bloqueador de ventanas activado</h3>',
      html: '<p class="text-xs text-zinc-500 text-left">Por favor, permite las ventanas emergentes en tu navegador para poder generar el reporte PDF.</p>',
      showConfirmButton: true,
      buttonsStyling: false,
      customClass: { popup: 'rounded-md p-6 border border-zinc-200 bg-white max-w-xs w-full font-sans' }
    });
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>Reporte de Seguridad Vecinal - Keeper</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #18181b;
            margin: 40px;
            font-size: 12px;
            line-height: 1.5;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #e4e4e7;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 20px;
            font-weight: 900;
            color: #ea580c;
            letter-spacing: -0.025em;
          }
          .meta {
            text-align: right;
            color: #71717a;
          }
          .title {
            font-size: 24px;
            font-weight: 800;
            margin-top: 0;
            color: #09090b;
          }
          .grid {
            display: grid;
            grid-template-cols: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          .card {
            border: 1px solid #e4e4e7;
            border-radius: 6px;
            padding: 20px;
            background: #fafafa;
          }
          .card-title {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            color: #71717a;
            letter-spacing: 0.05em;
            margin-top: 0;
            margin-bottom: 10px;
          }
          .large-number {
            font-size: 32px;
            font-weight: 900;
            color: #09090b;
            margin: 0;
          }
          .trend {
            font-size: 11px;
            color: #16a34a;
            font-weight: 600;
          }
          .table-title {
            font-size: 14px;
            font-weight: 700;
            margin-top: 30px;
            margin-bottom: 15px;
            color: #09090b;
            border-bottom: 1px solid #e4e4e7;
            padding-bottom: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          th {
            padding: 8px 0;
            border-bottom: 2px solid #e4e4e7;
            color: #71717a;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <span class="logo">KEEPER</span>
            <div style="font-size: 10px; color: #71717a; margin-top: 4px;">Red de Seguridad Vecinal Colaborativa</div>
          </div>
          <div class="meta">
            <div><strong>Filtro:</strong> ${currentRange}</div>
            <div><strong>Exportado el:</strong> ${new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <h1 class="title">Informe Ejecutivo de Seguridad</h1>
        <p style="color: #52525b; margin-top: -10px; margin-bottom: 30px; font-size: 13px;">Resumen del monitoreo de incidentes, índice de confianza y estado de atención a reportes vecinales en el cuadrante.</p>

        <div class="grid">
          <div class="card">
            <h3 class="card-title">Índice de Confianza</h3>
            <p class="large-number" style="color: #ea580c;">94%</p>
            <span class="trend">${trend}</span>
          </div>
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h3 class="card-title">Métricas de Atención</h3>
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="color: #71717a;">Incidentes Activos:</span>
                <strong style="color: #18181b;">${activeIncidents}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #71717a;">Tiempo de Respuesta Promedio:</span>
                <strong style="color: #18181b;">${responseTime}</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="card" style="margin-bottom: 30px;">
          <h3 class="card-title">Incidentes por Sector</h3>
          <div style="display: grid; grid-template-cols: 1fr 1fr 1fr; gap: 20px; text-align: center; margin-top: 10px;">
            <div>
              <div style="font-size: 11px; color: #71717a;">Sector Norte</div>
              <div style="font-size: 20px; font-weight: 800; color: #18181b; margin-top: 5px;">${secNorte}</div>
            </div>
            <div>
              <div style="font-size: 11px; color: #71717a;">Plaza Central</div>
              <div style="font-size: 20px; font-weight: 800; color: #18181b; margin-top: 5px;">${secCentral}</div>
            </div>
            <div>
              <div style="font-size: 11px; color: #71717a;">Zona Industrial</div>
              <div style="font-size: 20px; font-weight: 800; color: #ea580c; margin-top: 5px;">${secIndustrial}</div>
            </div>
          </div>
        </div>

        <div class="table-title">Cola de Moderación de Incidentes</div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Reportado Por</th>
              <th>Fecha/Hora</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
        </table>

        <div style="margin-top: 60px; border-top: 1px solid #e4e4e7; padding-top: 20px; text-align: center; color: #a1a1aa; font-size: 10px;">
          Este informe es confidencial y para uso exclusivo de la Red de Seguridad Keeper. Generado de forma automática por la consola de administración.
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

export function addFeedReport(report) {
  // Aseguramos que la cola de moderación reciba el reporte
  const feedReport = {
    id: report.id.startsWith('#') ? report.id : `#${report.id}`,
    tipo: report.tipo,
    reportadoPor: 'Vecino Anónimo',
    fecha: report.fecha || 'Hace un momento',
    estado: report.estado || 'Pendiente',
    accion: '—'
  };
  listReportesFeed.unshift(feedReport);

  // Aseguramos que el historial completo reciba el reporte
  const historyReport = {
    id: report.id.startsWith('#') ? report.id : `#${report.id}`,
    tipo: report.tipo,
    descripcion: report.descripcion || '—',
    ubicacion: report.ubicacion || 'Ubicación Manual',
    fecha: report.fecha || 'Hace un momento',
    estado: report.estado || 'Pendiente',
    evidencia: null,
    accion: '—'
  };
  listHistorialReportes.unshift(historyReport);

  // Si las tablas están actualmente dibujadas en el DOM, las refrescamos
  renderReportesFeedTable();
  renderHistorialReportesTable();
}
