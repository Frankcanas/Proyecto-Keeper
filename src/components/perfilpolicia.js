import Swal from 'sweetalert2';



// Información del policía logueado.
const POLICIAL_LOGUEADO = {
  nombre: "Javier A. Ortega Ruiz",
  rango: "Subintendente",
  placa: "PL-984572",
  estacion: "Estación Distrito Central",
  division: "Monitoreo y Patrullaje",
  tipoSangre: "O+",
  estado: "Online",
  fotoUrl: "https://images.unsplash.com/photo-1618015358954-115ef1ed1751?auto=format&fit=crop&q=80&w=256&h=256" //
};// Datos Mock Locales (Se usarán por defecto o en caso de que falle la API)
const REPORTES_MOCK = [
  {
    id: 1,
    kpId: 'KP-8821',
    tipo: 'Robo',
    subtipo: 'Robo a Mano Armada',
    descripcion: 'Asalto a mano armada por parte de dos individuos en motocicleta sin placas. Hurtaron celular y pertenencias.',
    ubicacion: 'Calle 8 # 12-42',
    barrio: 'La Candelaria',
    zona: 'Zona Centro',
    lat: 4.6320,
    lng: -74.0680,
    fecha: new Date(Date.now() - 2 * 60 * 1000), // Hace 2 minutos
    gravedad: 'Alta',
    estadoCaso: 'Caso cerrado', // Caso cerrado, En revisión, Pendiente, visto
    accionPolicia: 'Luis Morales', // Oficial que ejecutó acción
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1508847154043-be12a3283a0b?auto=format&fit=crop&q=80&w=600', // Foto del callejón oscuro donde ocurrió
    ciudadano: {
      id: 'CC 1.018.472.938',
      nombre: 'Diana Patricia Cruz Medina',
      direccion: 'Calle 8 # 12-42 Apto 302',
      barrio: 'La Candelaria'
    }
  },
  {
    id: 2,
    kpId: 'KP-8819',
    tipo: 'Sospechoso',
    subtipo: 'Vehículo Sospechoso',
    descripcion: 'Camioneta negra sospechosa estacionada sin placas obstaculizando rampa de acceso peatonal.',
    ubicacion: 'Plaza Central',
    barrio: 'Chapinero Centro',
    zona: 'Zona Centro',
    lat: 4.5980,
    lng: -74.0930,
    fecha: new Date(Date.now() - 14 * 60 * 1000), // Hace 14 minutos
    gravedad: 'Alta',
    estadoCaso: 'En revisión',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=600', // Foto de la camioneta negra sospechosa
    ciudadano: {
      id: 'CC 79.847.291',
      nombre: 'Luis Alberto Morales Gómez',
      direccion: 'Avenida Caracas # 53-80 Local 1',
      barrio: 'Chapinero Centro'
    }
  },
  {
    id: 3,
    kpId: 'KP-8815',
    tipo: 'Amenazas y peleas',
    subtipo: 'Falla de Energía / Riña',
    descripcion: 'Corte de energía en el alumbrado público de la zona industrial y riña callejera entre varios operarios.',
    ubicacion: 'Zona Industrial',
    barrio: 'Usaquén Industrial',
    zona: 'Zona Norte',
    lat: 4.6860,
    lng: -74.0480,
    fecha: new Date(Date.now() - 42 * 60 * 1000), // Hace 42 minutos
    gravedad: 'Alta',
    estadoCaso: 'Caso cerrado',
    accionPolicia: '—',
    evidencia: false,
    fotoEvidencia: null,
    ciudadano: {
      id: 'CC 1.036.782.910',
      nombre: 'Carlos Mario Restrepo Ortiz',
      direccion: 'Calle 100 # 19-45 Int 4',
      barrio: 'Usaquén'
    }
  },
  {
    id: 4,
    kpId: 'KP-8810',
    tipo: 'Robo',
    subtipo: 'Robo a Mano Armada',
    descripcion: 'Ingreso forzado de delincuentes armados a establecimiento comercial rompiendo la cerradura de vidrio de la entrada.',
    ubicacion: 'Avenida 42 # 10-15',
    barrio: 'Las Nieves',
    zona: 'Zona Centro',
    lat: 4.6010,
    lng: -74.0720,
    fecha: new Date(Date.now() - 120 * 60 * 1000), // Hace 2 horas
    gravedad: 'Alta',
    estadoCaso: 'En revisión',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600', // Foto de la cerradura de vidrio rota
    ciudadano: {
      id: 'CC 52.987.342',
      nombre: 'Sandra Milena Rojas Soto',
      direccion: 'Carrera 7 # 12-50 Local 3',
      barrio: 'Las Nieves'
    }
  },
  {
    id: 5,
    kpId: 'KP-8805',
    tipo: 'Hurto',
    subtipo: 'Hurto / Robo Simple',
    descripcion: 'Hurto de espejo lateral de camioneta estacionada en vía pública sin supervisión.',
    ubicacion: 'Carrera 15 # 82-10',
    barrio: 'El Lago',
    zona: 'Zona Norte',
    lat: 4.6670,
    lng: -74.0550,
    fecha: new Date(Date.now() - 12 * 24 * 3600 * 1000), // Hace 12 días
    gravedad: 'Media',
    estadoCaso: 'visto',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600', // Foto de la camioneta sin el espejo lateral
    ciudadano: {
      id: 'CC 80.124.957',
      nombre: 'Andrés Felipe Restrepo Prada',
      direccion: 'Carrera 15 # 82-12',
      barrio: 'El Lago'
    }
  },
  {
    id: 6,
    kpId: 'KP-8802',
    tipo: 'Hurto',
    subtipo: 'Hurto / Robo Simple',
    descripcion: 'Pérdida de bolso de mano tras descuido en cafetería local.',
    ubicacion: 'Avenida Suba # 118-20',
    barrio: 'Niza Sur',
    zona: 'Zona Norte',
    lat: 4.7010,
    lng: -74.0750,
    fecha: new Date(Date.now() - 25 * 24 * 3600 * 1000), // Hace 25 días
    gravedad: 'Media',
    estadoCaso: 'Pendiente',
    accionPolicia: '—',
    evidencia: false,
    fotoEvidencia: null,
    ciudadano: {
      id: 'CC 39.756.281',
      nombre: 'Martha Lucía Beltrán Tobón',
      direccion: 'Avenida Suba # 118-20 Apto 501',
      barrio: 'Niza Sur'
    }
  },
  {
    id: 7,
    kpId: 'KP-8801',
    tipo: 'Amenazas y peleas',
    subtipo: 'Riña / Disputa Vial',
    descripcion: 'Fuerte riña física y agresiones entre conductores a mitad de la calzada por choque simple.',
    ubicacion: 'Carrera 15 # 80-22',
    barrio: 'Antiguo Country',
    zona: 'Zona Centro',
    lat: 4.6650,
    lng: -74.0580,
    fecha: new Date(Date.now() - 28 * 24 * 3600 * 1000), // Hace 28 días
    gravedad: 'Media',
    estadoCaso: 'En revisión',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 1.020.448.917',
      nombre: 'Juan Camilo Herrera Rojas',
      direccion: 'Calle 81 # 14-55',
      barrio: 'Antiguo Country'
    }
  }
];

// Variable global donde se almacenan los reportes activos
let reportes = [];

// Función para cargar los reportes (Desde API o fallback local)
async function cargarReportesDesdeAPI() {
  // --- CONFIGURACIÓN DE API EXTERNA ---
  // Para consumir una API real en el futuro, descomenta las siguientes líneas y ajusta la URL:
  /*
  try {
    const respuesta = await fetch('https://api.tu-servidor.com/v1/policia/reportes');
    if (!respuesta.ok) throw new Error('Error al consultar la API de reportes');
    const datos = await respuesta.json();
    
    // Mapear fechas a objetos Date reales si vienen como strings ISO
    reportes = datos.map(r => ({
      ...r,
      fecha: new Date(r.fecha)
    }));
    return;
  } catch (error) {
    console.error("Error consumiendo la API de Policía, cargando datos locales (Mock):", error);
  }
  */

  // Por defecto consumimos los datos locales (Mock)
  reportes = REPORTES_MOCK.map(r => ({
    ...r,
    fecha: r.fecha instanceof Date ? r.fecha : new Date(r.fecha)
  }));
}

// Instancia global del mapa interactivo
let mapInstance = null;
let mapMarkers = [];

// Vista/Categoría activa de navegación ('Estadisticas', 'Historial', 'Mapa')
let tabActivo = 'Estadisticas'; // 'Estadisticas' por defecto

// Filtros para la pantalla detallada de Historial
let filtroHistorialTiempo = 'todo';
let filtroHistorialCategoria = 'todos';
let ordenHistorialGravedad = 'gravedad-desc';

// Filtro de tiempo para la pantalla de Estadísticas
let filtroEstadisticasTiempo = '3dias';

// Caso que se está editando en el modal completo
let casoModalId = null;

/**

 */
export async function inicializarDashboard() {
  const app = document.getElementById('app');
  if (!app) return;

  await cargarReportesDesdeAPI();

  app.innerHTML = `
    <div class="flex min-h-screen bg-[#f4f4f5] text-zinc-950 font-sans selection:bg-[#ff5d00] selection:text-white">
      
      <!-- BARRA LATERAL (Negro Sólido, Sin Degradados, Bordes de 1px) -->
      <aside class="w-72 bg-[#000000] text-zinc-300 flex flex-col justify-between border-r border-zinc-800 shrink-0 select-none">
        <div>
          <!-- Logo de la Aplicación (keeperR) -->
          <div class="p-6 flex items-center gap-3 border-b border-zinc-800">
            <div class="bg-[#10b981] text-white p-2 rounded-md font-bold w-9 h-9 flex items-center justify-center text-lg tracking-wider">
              K
            </div>
            <div>
              <div class="text-[9px] uppercase font-mono tracking-widest text-zinc-550 leading-none">PANEL</div>
              <div class="text-lg font-bold text-white tracking-tight mt-0.5">keeperR</div>
            </div>
          </div>

          <!-- PERFIL DEL POLICÍA LOGUEADO (Verde Sólido Minimalista, Bordes de 6px/8px, Sin Degradados) -->
          <div class="m-4 p-4 rounded-md bg-[#0a1e12] border border-[#10b981]/25 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10b981] to-[#047857]"></div>
            
            <div class="flex items-center justify-between">
              <div class="relative">
                <img src="${POLICIAL_LOGUEADO.fotoUrl}" alt="Oficial" class="w-11 h-11 object-cover rounded-full border border-[#10b981]/40">
                <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10b981] border-2 border-[#0a1e12]"></span>
              </div>
              <div class="min-w-0 flex-1 ml-3">
                <div class="text-[8px] uppercase tracking-widest text-[#10b981] font-bold font-mono">USUARIO</div>
                <div class="text-xs font-semibold text-zinc-100 truncate">${POLICIAL_LOGUEADO.nombre}</div>
                <div class="text-[9px] text-zinc-400 font-mono mt-0.5">Monitoreo activo</div>
              </div>
              <div class="shrink-0 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-bold uppercase font-mono px-2 py-0.5 rounded-md">
                Online
              </div>
            </div>
          </div>

          <!-- NAVEGACIÓN MODIFICADA -->
          <nav class="px-3 space-y-1" id="sidebar-navigation">
            
            <button data-tab="Estadisticas" class="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-all text-white bg-[#1a1a1a] border border-zinc-800">
              <!-- Icono Estadísticas -->
              <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2"></path>
              </svg>
              Estadísticas
            </button>
            
            <button data-tab="Historial" class="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-all text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b]/50">
              <!-- Icono Historial -->
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Historial
            </button>

            <button data-tab="Mapa" class="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-all text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b]/50">
              <!-- Icono Mapa -->
              <svg class="w-4 h-4 text-emerald-555" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              Mapa
            </button>
            
          </nav>
        </div>

        <!-- Botón Salir -->
        <div class="p-4 border-t border-zinc-900">
          <button id="btn-salir" class="w-full flex items-center justify-center gap-2 border border-zinc-800 hover:border-red-500/35 hover:bg-red-500/5 text-red-500 px-4 py-2 rounded-md text-sm font-semibold transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Salir del panel
          </button>
        </div>
      </aside>

      <!-- CONTENIDO PRINCIPAL -->
      <main class="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 max-w-[1600px] mx-auto flex flex-col justify-start">
        
        <!-- ======================================================= -->
        <!-- VISTA DE ESTADÍSTICAS (RESUMEN ESTRATÉGICO)             -->
        <!-- ======================================================= -->
        <div id="view-estadisticas" class="space-y-6 w-full">
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span class="text-[9px] uppercase font-mono tracking-widest text-zinc-400 font-bold leading-none">MONITOREO</span>
              <h2 class="text-xl font-bold text-zinc-900 tracking-tight mt-1">Resumen Estratégico</h2>
              <p class="text-xs text-zinc-555 mt-0.5">Seguimiento de incidentes en tiempo real y métricas de seguridad vecinal.</p>
            </div>
            
            <div class="flex items-center gap-2">
              <select id="est-filtro-tiempo" class="bg-white border border-zinc-200 text-zinc-700 font-bold text-[10px] px-3 py-1.5 rounded-md focus:outline-none cursor-pointer transition-all">
                <option value="3dias">Últimos 3 días</option>
                <option value="semana">Última semana</option>
                <option value="mes">Último mes</option>
              </select>
              
              <button id="btn-exportar" class="bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-[10px] px-3 py-1.5 rounded-md transition-all select-none">
                Exportar reporte
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            
            <!-- TARJETA DEL GRÁFICO (Col-span 8) -->
            <div class="xl:col-span-8 bg-white rounded-lg p-6 border border-zinc-200 flex flex-col justify-between min-h-[300px]">
              
              <div class="flex items-center justify-between pb-4 border-b border-zinc-100">
                <span class="text-[9px] uppercase font-mono tracking-widest text-zinc-400 font-bold">ÍNDICE DE CONFIANZA SEMANAL</span>
                <span class="inline-flex items-center bg-emerald-50 text-emerald-700 border border-[#bbf7d0] px-2 py-0.5 rounded-md text-[9px] font-bold">
                  +12.4% vs mes anterior
                </span>
              </div>

              <!-- Gráfico Ficticio en HTML/CSS Puro -->
              <div class="relative flex-1 mt-6 flex flex-col justify-end">
                
                <div class="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
                  <div class="border-b border-zinc-100 w-full"></div>
                  <div class="border-b border-zinc-100 w-full"></div>
                  <div class="border-b border-zinc-100 w-full"></div>
                  <div class="border-b border-zinc-100 w-full"></div>
                </div>

                <div class="relative z-10 flex justify-around items-end h-40 px-4">
                  <!-- LUN -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-lun">32</div>
                    <div class="bg-[#ff5d00] w-6 rounded-t-sm transition-all duration-350" style="height: 45%" id="chart-bar-lun"></div>
                  </div>
                  <!-- MAR -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-mar">48</div>
                    <div class="bg-[#ff5d00] w-6 rounded-t-sm transition-all duration-350" style="height: 60%" id="chart-bar-mar"></div>
                  </div>
                  <!-- MIÉ -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-mie">22</div>
                    <div class="bg-[#ff5d00] w-6 rounded-t-sm transition-all duration-350" style="height: 30%" id="chart-bar-mie"></div>
                  </div>
                  <!-- JUE -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-jue">61</div>
                    <div class="bg-[#ff5d00] w-6 rounded-t-sm transition-all duration-350" style="height: 75%" id="chart-bar-jue"></div>
                  </div>
                  <!-- VIE -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-vie">39</div>
                    <div class="bg-[#ff5d00] w-6 rounded-t-sm transition-all duration-350" style="height: 50%" id="chart-bar-vie"></div>
                  </div>
                  <!-- SÁB -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-sab">72</div>
                    <div class="bg-[#ff5d00] w-6 rounded-t-sm transition-all duration-350" style="height: 85%" id="chart-bar-sab"></div>
                  </div>
                  <!-- DOM -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-dom">85</div>
                    <div class="bg-[#ff5d00] w-6 rounded-t-sm transition-all duration-350" style="height: 95%" id="chart-bar-dom"></div>
                  </div>
                </div>

                <div class="flex justify-around pt-3 border-t border-zinc-200 mt-2 text-[9px] font-bold text-zinc-400 uppercase font-mono">
                  <span class="w-12 text-center">LUN</span>
                  <span class="w-12 text-center">MAR</span>
                  <span class="w-12 text-center">MIÉ</span>
                  <span class="w-12 text-center">JUE</span>
                  <span class="w-12 text-center">VIE</span>
                  <span class="w-12 text-center">SÁB</span>
                  <span class="w-12 text-center">DOM</span>
                </div>

              </div>

            </div>

            <!-- TARJETAS LATERALES DERECHAS -->
            <div class="xl:col-span-4 flex flex-col gap-6 justify-between">
              
              <!-- CARD: INCIDENTES ACTIVOS -->
              <div class="bg-white rounded-lg p-6 border border-zinc-200 flex flex-col justify-between h-[138px]">
                <div class="flex justify-between items-start">
                  <span class="text-[9px] uppercase font-mono tracking-widest text-zinc-400 font-bold">Incidentes Activos</span>
                  <span class="inline-flex items-center gap-1 bg-orange-50 border border-orange-200 text-[#ff5d00] text-[8px] font-bold uppercase font-mono px-2 py-0.5 rounded-md animate-pulse">
                    ● En vivo
                  </span>
                </div>
                <div class="text-4xl font-extrabold text-zinc-950 mt-2" id="val-incidentes-activos">28</div>
                
                <div class="border-t border-zinc-100 pt-2 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                  <span>TIEMPO MEDIO DE RESPUESTA</span>
                  <span class="font-bold text-zinc-800 text-[10px]">4m 12s</span>
                </div>
              </div>

              <!-- CARD: INCIDENTES POR SECTOR -->
              <div class="bg-white rounded-lg p-6 border border-zinc-200 flex flex-col justify-between h-[138px]">
                <span class="text-[9px] uppercase font-mono tracking-widest text-zinc-400 font-bold block mb-2">INCIDENTES POR SECTOR</span>
                
                <div class="space-y-2 text-[10px] font-medium text-zinc-700">
                  <div class="space-y-0.5">
                    <div class="flex justify-between font-semibold">
                      <span>Sector Norte</span>
                      <span id="sector-norte-val">42</span>
                    </div>
                    <div class="w-full bg-zinc-100 h-1.5 rounded-sm overflow-hidden">
                      <div class="bg-[#ff5d00] h-full rounded-sm" style="width: 42%" id="sector-norte-bar"></div>
                    </div>
                  </div>

                  <div class="space-y-0.5">
                    <div class="flex justify-between font-semibold">
                      <span>Plaza Central</span>
                      <span id="sector-central-val">29</span>
                    </div>
                    <div class="w-full bg-zinc-100 h-1.5 rounded-sm overflow-hidden">
                      <div class="bg-[#ff5d00] h-full rounded-sm" style="width: 29%" id="sector-central-bar"></div>
                    </div>
                  </div>

                  <div class="space-y-0.5">
                    <div class="flex justify-between font-semibold">
                      <span>Zona Industrial</span>
                      <span id="sector-industrial-val">64</span>
                    </div>
                    <div class="w-full bg-zinc-100 h-1.5 rounded-sm overflow-hidden">
                      <div class="bg-[#ff5d00] h-full rounded-sm" style="width: 64%" id="sector-industrial-bar"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <!-- TARJETA: COLA DE MODERACIÓN -->
          <div class="bg-white rounded-lg p-6 border border-zinc-200 w-full space-y-4">
            
            <div class="flex justify-between items-center pb-2 border-b border-zinc-100">
              <div>
                <h3 class="text-sm font-bold text-zinc-950">Cola de Moderación</h3>
                <p class="text-[11px] text-zinc-400">Filtrar y verificar reportes entrantes.</p>
              </div>
              <button id="btn-ver-todo-historial" class="text-[#ff5d00] hover:text-[#e05200] font-bold text-[10px] transition-colors select-none">
                Ver todo el historial &rarr;
              </button>
            </div>

            <!-- Tabla de Moderación Rápida -->
            <div class="overflow-x-auto border border-zinc-150 rounded-md">
              <table class="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr class="border-b border-zinc-150 bg-zinc-50/50 text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                    <th class="px-5 py-3">ID</th>
                    <th class="px-4 py-3">TIPO</th>
                    <th class="px-4 py-3">REPORTADO POR</th>
                    <th class="px-4 py-3">FECHA/HORA</th>
                    <th class="px-4 py-3">ESTADO</th>
                    <th class="px-4 py-3">ACCIÓN</th>
                  </tr>
                </thead>
                <tbody id="tabla-moderacion-cuerpo" class="divide-y divide-zinc-100 text-xs font-semibold text-zinc-700">
                  <!-- Se inyecta mediante JS -->
                </tbody>
              </table>
            </div>

          </div>

        </div>

        <!-- ======================================================= -->
        <!-- VISTA DE HISTORIAL (ESTRUCTURA ORIGINAL CON SELECT INLINE DE ESTADOS Y REGISTRO EN ACCIONES) -->
        <!-- ======================================================= -->
        <div id="view-historial" class="hidden bg-white rounded-lg p-6 md:p-8 border border-zinc-200 w-full flex flex-col justify-between min-h-[600px]">
          
          <div>
            <!-- Cabecera de la Sección -->
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-zinc-100">
              <div>
                <span class="text-[9px] uppercase font-mono tracking-widest text-zinc-400 font-bold leading-none">SEGURIDAD</span>
                <h2 class="text-xl font-bold text-zinc-900 tracking-tight mt-1">Historial de Reportes</h2>
                <p class="text-xs text-zinc-550 mt-0.5">Listado completo de incidentes y problemas informados en el sector.</p>
              </div>

              <!-- Controles de Filtros Dinámicos colocados arriba -->
              <div class="flex flex-wrap items-center gap-3">
                <!-- Filtro de Categoría -->
                <div>
                  <label class="block text-[8px] text-zinc-400 uppercase font-mono mb-1 font-bold">Tipo Delito</label>
                  <select id="hist-filtro-categoria" class="bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 font-bold text-[10px] px-2.5 py-1.5 rounded-md border-none focus:outline-none cursor-pointer transition-all">
                    <option value="todos">Todos los delitos</option>
                    <option value="Robo">Robos</option>
                    <option value="Hurto">Hurtos</option>
                    <option value="Amenazas y peleas">Amenazas y peleas</option>
                  </select>
                </div>

                <!-- Filtro de Tiempos -->
                <div>
                  <label class="block text-[8px] text-zinc-400 uppercase font-mono mb-1 font-bold">Filtrar por Tiempos</label>
                  <select id="hist-filtro-tiempo" class="bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 font-bold text-[10px] px-2.5 py-1.5 rounded-md border-none focus:outline-none cursor-pointer transition-all">
                    <option value="todo">Todos los tiempos</option>
                    <option value="dia">Hoy (24h)</option>
                    <option value="semana">Últimas 2 semanas</option>
                    <option value="mes">Último mes (30d)</option>
                  </select>
                </div>

                <!-- Ordenar por Importancia (Gravedad) -->
                <div>
                  <label class="block text-[8px] text-zinc-400 uppercase font-mono mb-1 font-bold">Importancia / Criterio</label>
                  <select id="hist-orden-gravedad" class="bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 font-bold text-[10px] px-2.5 py-1.5 rounded-md border-none focus:outline-none cursor-pointer transition-all">
                    <option value="gravedad-desc">Gravedad: Crítico a Normal</option>
                    <option value="gravedad-asc">Gravedad: Normal a Crítico</option>
                    <option value="fecha-desc">Fecha: Más recientes</option>
                    <option value="fecha-asc">Fecha: Más antiguos</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Tabla de Reportes -->
            <div class="overflow-x-auto mt-6 border border-zinc-200 rounded-lg bg-white">
              <table class="w-full min-w-[950px] border-collapse">
                <thead>
                  <tr class="border-b border-zinc-200 bg-zinc-50/50">
                    <th class="text-left text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-5 py-3">ID</th>
                    <th class="text-left text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">TIPO</th>
                    <th class="text-left text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-4 py-3 w-[25%]">DESCRIPCIÓN</th>
                    <th class="text-left text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">UBICACIÓN</th>
                    <th class="text-left text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">FECHA</th>
                    <th class="text-left text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">ESTADO</th>
                    <th class="text-left text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">ACCIONES</th>
                    <th class="text-center text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-5 py-3">EVIDENCIAS</th>
                  </tr>
                </thead>
                <tbody id="tabla-reportes-cuerpo" class="divide-y divide-zinc-100">
                  <!-- Se inyecta mediante JS -->
                </tbody>
              </table>
            </div>

          </div>

          <!-- Conteo de la Tabla en el Footer -->
          <div class="text-[9px] text-zinc-400 font-mono pt-4 mt-6 border-t border-zinc-150 flex justify-between items-center">
            <span>Terminal Central de Auditoría</span>
            <span id="hist-contador-total" class="font-bold text-zinc-800">-- Incidentes</span>
          </div>

        </div>

        <!-- ======================================================= -->
        <!-- VISTA DE MAPA JURISDICCIONAL                             -->
        <!-- ======================================================= -->
        <div id="view-mapa" class="hidden grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch w-full">
          
          <div class="xl:col-span-8 bg-white rounded-lg p-5 border border-zinc-200 flex flex-col justify-between h-[650px] relative">
            <div class="flex items-center justify-between z-20 absolute top-8 left-8 right-8 pointer-events-none">
              <div class="bg-white border border-zinc-200 px-4 py-2 rounded-md flex items-center gap-2 pointer-events-auto">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <div>
                  <div class="text-[9px] uppercase tracking-wider text-zinc-400 font-bold leading-none">Ruta Segura</div>
                  <div class="text-xs font-bold text-zinc-950 mt-0.5">Jurisdicción: Mapa de Monitoreo</div>
                </div>
              </div>
            </div>

            <!-- Mapa Real -->
            <div class="w-full h-full rounded-md overflow-hidden border border-zinc-200 z-10 relative">
              <div id="map" class="w-full h-full" style="background: #18181b; background-image: radial-gradient(#27272a 1px, transparent 1px); background-size: 16px 16px;"></div>
              
              <!-- Cartografía en Espera Overlay -->
              <div class="absolute bottom-4 right-4 bg-zinc-950/90 border border-zinc-800 text-zinc-300 px-3.5 py-2 rounded-md text-[10px] font-mono z-[1000] flex items-center gap-2 select-none shadow-lg">
                <svg class="w-3.5 h-3.5 text-amber-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <span>Soporte de Mapas: Modo Offline (Configura tu API en el código)</span>
              </div>
            </div>

            <div class="flex items-center justify-between z-20 absolute bottom-8 left-8 right-8 pointer-events-none">
              <div class="bg-[#ff5d00] text-white px-5 py-2.5 rounded-md flex flex-col justify-center pointer-events-auto border border-[#ff5d00]">
                <span class="text-[8px] uppercase tracking-widest opacity-90 font-bold font-mono">Filtro Activo</span>
                <span id="map-alert-text" class="text-xs font-bold mt-0.5">Todos los incidentes</span>
              </div>
            </div>

          </div>

          <!-- COLUMNA DE ALERTAS RECIENTES (Col-span 4) -->
          <div class="xl:col-span-4 bg-white rounded-lg p-6 border border-zinc-200 flex flex-col justify-between h-[650px]">
            
            <div class="flex items-center justify-between border-b border-zinc-200 pb-3">
              <div>
                <div class="text-[9px] uppercase tracking-widest text-zinc-400 font-bold font-mono">EN VIVO</div>
                <h3 class="text-sm font-bold text-zinc-950 mt-0.5">Alertas Recientes</h3>
              </div>
            </div>

            <div id="lista-alertas-recientes" class="flex-1 my-3 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              <!-- Se inyecta mediante JS -->
            </div>

            <div class="text-[9px] text-zinc-400 font-mono pt-2 border-t border-zinc-200 flex justify-between items-center">
              <span>Central de Comunicaciones</span>
              <span id="contador-alertas" class="font-bold text-zinc-800">-- Incidentes</span>
            </div>

          </div>

        </div>

      </main>

      <!-- MODAL DETALLE DE CASO & EVIDENCIA FOTOGRÁFICA (Solo muestra la imagen sin botones de publicación) -->
      <div id="modal-detalle-caso" class="fixed inset-0 bg-black/60 backdrop-blur-none z-50 flex items-center justify-center opacity-0 pointer-events-none transition-all duration-150 p-4">
        <div class="bg-white border border-zinc-200 rounded-lg w-full max-w-lg overflow-hidden transform scale-95 transition-all duration-150">
          
          <!-- Encabezado Modal -->
          <div class="p-4 border-b border-zinc-150 flex items-center justify-between bg-zinc-50/50">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#ff5d00]"></span>
              <h3 class="text-zinc-950 font-bold text-xs tracking-tight" id="modal-titulo-caso">Evidencia Adjunta</h3>
            </div>
            <button id="btn-cerrar-modal" class="text-zinc-400 hover:text-zinc-700 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Contenido de Evidencia -->
          <div class="p-5 space-y-4">
            
            <div class="border border-zinc-200 rounded-md overflow-hidden bg-zinc-50 relative aspect-video flex items-center justify-center">
              <img id="modal-foto-evidencia" src="" alt="Evidencia del Incidente" class="w-full h-full object-cover">
            </div>
            
            <div class="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
              <span id="modal-label-archivo">Evidencia_Incidente.jpg</span>
              <span class="font-bold text-zinc-500">Evidencia Completa</span>
            </div>

            <!-- Botón de Cerrar (Se eliminó el botón de publicación) -->
            <div class="pt-2 flex justify-end">
              <button type="button" id="btn-cerrar-modal-accion" class="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2.5 rounded-md text-xs uppercase tracking-wider transition-all select-none">
                Cerrar Imagen
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  `;

  // Inicializar sub-módulos lógicos
  inicializarMapaVea();
  actualizarEstadisticasVisuales();
  renderizarTablaHistorial();
  renderizarTablaModeracion();
  renderizarAlertasRecientes();
  enlazarEventosAcciones();
}

/**


 */
function inicializarMapaVea() {
  if (typeof L === 'undefined') {
    document.getElementById('map').innerHTML = `
      <div class="flex flex-col items-center justify-center h-full text-zinc-400 bg-zinc-150 p-6 text-center font-sans">
        <svg class="w-12 h-12 text-zinc-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <span class="text-xs font-bold text-zinc-800">Mapa fuera de línea</span>
        <span class="text-[10px] text-zinc-550 mt-1">Conéctate a internet para inicializar la cartografía en tiempo real.</span>
      </div>
    `;
    return;
  }

  const latBase = 4.6350;
  const lngBase = -74.0720;

  mapInstance = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: true
  }).setView([latBase, lngBase], 12);

  L.control.zoom({
    position: 'bottomleft'
  }).addTo(mapInstance);

  // === CONSUMO DE API DE MAPA DESACTIVADO ===
  // Para consumir un mapa base externo (como CARTO, Mapbox o Google Maps),
  // descomente una de las siguientes opciones según la API que seleccione:
  
  /*
  // Opción A: API de Mapas CARTO / OpenStreetMap (Gratuito, sin clave de API)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(mapInstance);
  */

  /*
  // Opción B: API de Mapbox (Requiere Token de Acceso de Mapbox)
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '&copy; Mapbox',
    maxZoom: 18,
    id: 'mapbox/dark-v11',
    accessToken: 'TU_MAPBOX_ACCESS_TOKEN_AQUÍ'
  }).addTo(mapInstance);
  */
  
  /*
  // Opción C: Google Maps Tiles API (Vía Leaflet)
  L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    attribution: '&copy; Google Maps',
    maxZoom: 20
  }).addTo(mapInstance);
  */

  actualizarMarcadoresEnMapa();
}

/**
 * Pinta los marcadores de incidentes en el mapa
 */
function actualizarMarcadoresEnMapa() {
  if (!mapInstance) return;

  mapMarkers.forEach(m => mapInstance.removeLayer(m));
  mapMarkers = [];

  reportes.forEach(rep => {
    if (!rep.lat || !rep.lng) return;

    let colorClase = 'bg-blue-500';
    if (rep.tipo === 'Robo') colorClase = 'bg-red-650';
    else if (rep.tipo === 'Hurto') colorClase = 'bg-[#ff5d00]';
    else if (rep.tipo === 'Amenazas y peleas') colorClase = 'bg-yellow-500';

    const customMarkerHtml = L.divIcon({
      className: 'custom-div-marker',
      html: `<div class="w-6.5 h-6.5 rounded-full ${colorClase} border border-white flex items-center justify-center shadow transition-transform duration-300 hover:scale-110">
        <span class="w-1.5 h-1.5 bg-white rounded-full"></span>
      </div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });

    const marker = L.marker([rep.lat, rep.lng], { icon: customMarkerHtml }).addTo(mapInstance);

    const popupHtml = `
      <div class="p-1 font-sans rounded text-zinc-900" style="min-width: 190px;">
        <div class="flex items-center justify-between border-b border-zinc-150 pb-1.5 mb-1.5">
          <span class="font-bold text-xs uppercase text-[#ff5d00]">${rep.tipo}</span>
          <span class="text-[9px] bg-zinc-100 text-zinc-650 px-2 py-0.5 rounded font-mono font-bold">${rep.gravedad}</span>
        </div>
        <p class="text-xs text-zinc-700 leading-tight mb-2 font-medium">${rep.descripcion}</p>
        <div class="text-[9px] text-zinc-400 font-mono space-y-0.5">
          <div>Dir: ${rep.ubicacion} (B. ${rep.barrio})</div>
          <div class="font-bold text-zinc-500">${formatearFechaHumana(rep.fecha)}</div>
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml, {
      className: 'custom-popup-claridad'
    });

    mapMarkers.push(marker);
  });
}

/**
 * ==========================================
 * CALCULADORA DINÁMICA DE ESTADÍSTICAS
 * ==========================================
 */
function actualizarEstadisticasVisuales() {
  const activeValEl = document.getElementById('val-incidentes-activos');
  if (!activeValEl) return;

  const activosTotales = reportes.filter(r => r.estadoCaso !== 'Caso cerrado').length;
  activeValEl.textContent = `${activosTotales + 23}`;

  let factor = 1.0;
  if (filtroEstadisticasTiempo === 'semana') {
    factor = 2.4;
  } else if (filtroEstadisticasTiempo === 'mes') {
    factor = 6.2;
  }

  const valoresDias = {
    lun: Math.round(32 * factor),
    mar: Math.round(48 * factor),
    mie: Math.round(22 * factor),
    jue: Math.round(61 * factor),
    vie: Math.round(39 * factor),
    sab: Math.round(72 * factor),
    dom: Math.round(85 * factor)
  };

  const maxVal = Math.max(...Object.values(valoresDias));

  Object.keys(valoresDias).forEach(dia => {
    const barEl = document.getElementById(`chart-bar-${dia}`);
    const valEl = document.getElementById(`chart-val-${dia}`);
    if (barEl && valEl) {
      const porcentaje = maxVal > 0 ? (valoresDias[dia] / maxVal) * 85 + 10 : 10;
      barEl.style.height = `${porcentaje}%`;
      valEl.textContent = valoresDias[dia];
    }
  });

  const secNorte = Math.round(42 * (factor * 0.85));
  const secCentral = Math.round(29 * (factor * 0.90));
  const secIndustrial = Math.round(64 * (factor * 0.75));

  const totalSectores = secNorte + secCentral + secIndustrial;

  const nEl = document.getElementById('sector-norte-val');
  const nBar = document.getElementById('sector-norte-bar');
  if (nEl && nBar) {
    nEl.textContent = secNorte;
    nBar.style.width = `${totalSectores > 0 ? (secNorte / totalSectores) * 100 : 42}%`;
  }

  const cEl = document.getElementById('sector-central-val');
  const cBar = document.getElementById('sector-central-bar');
  if (cEl && cBar) {
    cEl.textContent = secCentral;
    cBar.style.width = `${totalSectores > 0 ? (secCentral / totalSectores) * 100 : 29}%`;
  }

  const iEl = document.getElementById('sector-industrial-val');
  const iBar = document.getElementById('sector-industrial-bar');
  if (iEl && iBar) {
    iEl.textContent = secIndustrial;
    iBar.style.width = `${totalSectores > 0 ? (secIndustrial / totalSectores) * 100 : 64}%`;
  }
}

/**
 * ==========================================
 * LISTAS Y ALERTAS RECIENTES (MAPA)
 * ==========================================
 */
function renderizarAlertasRecientes() {
  const contenedorListado = document.getElementById('lista-alertas-recientes');
  const contadorAlertas = document.getElementById('contador-alertas');
  if (!contenedorListado) return;

  if (contadorAlertas) {
    contadorAlertas.textContent = `${reportes.length} Incidentes`;
  }

  contenedorListado.innerHTML = reportes.slice().sort((a, b) => b.fecha - a.fecha).map(rep => {
    let colorEtiqueta = 'text-[#ff5d00]';
    let textoEtiqueta = 'Urgente';

    if (rep.gravedad === 'Alta') {
      colorEtiqueta = 'text-red-655 font-bold';
      textoEtiqueta = 'Crítico';
    } else if (rep.gravedad === 'Baja') {
      colorEtiqueta = 'text-[#10b981]';
      textoEtiqueta = 'Normal';
    }

    const minutos = Math.floor((new Date() - rep.fecha) / (1000 * 60));
    let tiempoTexto = 'Hace instantes';

    if (minutos >= 60 * 24) {
      const dias = Math.floor(minutos / (60 * 24));
      tiempoTexto = `${dias} d`;
    } else if (minutos >= 60) {
      const horas = Math.floor(minutos / 60);
      tiempoTexto = `${horas} h`;
    } else if (minutos > 0) {
      tiempoTexto = `${minutos} min`;
    }

    return `
      <div data-id="${rep.id}" class="item-alerta p-3 rounded-md hover:bg-zinc-50 border border-zinc-150 transition-all duration-150 cursor-pointer flex justify-between items-start gap-4">
        <div>
          <h4 class="text-xs font-bold text-zinc-950">${rep.ubicacion}</h4>
          <p class="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">${rep.descripcion}</p>
          <span class="text-[9px] text-zinc-400 font-mono mt-1 inline-block">${tiempoTexto} • <strong class="text-zinc-600 font-semibold uppercase font-mono text-[9px]">${rep.estadoCaso}</strong></span>
        </div>
        <div class="text-[9px] uppercase font-bold font-mono tracking-wider text-right shrink-0 ${colorEtiqueta}">
          ${textoEtiqueta}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * ==========================================
 * RENDERS DE TABLAS
 * ==========================================
 */

// 1. Render de la Cola de Moderación Rápida (Estadísticas - Imagen 4)
function renderizarTablaModeracion() {
  const tbody = document.getElementById('tabla-moderacion-cuerpo');
  if (!tbody) return;

  const recientes = reportes.slice().sort((a, b) => b.fecha - a.fecha).slice(0, 3);

  tbody.innerHTML = recientes.map(rep => {
    const nombreTipo = rep.subtipo || rep.tipo;

    let colorSelectClass = 'bg-[#fffbeb] text-amber-800 border-amber-200';
    if (rep.estadoCaso === 'Caso cerrado' || rep.estadoCaso === 'Completado') {
      colorSelectClass = 'bg-[#f0fdf4] text-emerald-800 border-[#bbf7d0]';
    } else if (rep.estadoCaso === 'En revisión') {
      colorSelectClass = 'bg-[#eff6ff] text-blue-800 border-[#bfdbfe]';
    } else if (rep.estadoCaso === 'visto') {
      colorSelectClass = 'bg-[#f4f4f5] text-zinc-700 border-zinc-200';
    }

    const selectEstadoHtml = `
      <div class="relative inline-block w-32">
        <select data-id="${rep.id}" class="select-estado-inline-mod appearance-none w-full ${colorSelectClass} border font-bold font-mono text-[9px] uppercase px-2 py-1 pr-6 rounded-md focus:outline-none cursor-pointer transition-colors duration-150">
          <option value="Pendiente" ${rep.estadoCaso === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          <option value="visto" ${rep.estadoCaso === 'visto' ? 'selected' : ''}>Visto</option>
          <option value="En revisión" ${rep.estadoCaso === 'En revisión' ? 'selected' : ''}>En revisión</option>
          <option value="Caso cerrado" ${rep.estadoCaso === 'Caso cerrado' || rep.estadoCaso === 'Completado' ? 'selected' : ''}>Completado</option>
        </select>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 text-current pointer-events-none">
          <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
          </svg>
        </span>
      </div>
    `;

    const accionTexto = rep.accionPolicia || '—';
    const reportante = rep.ciudadano ? rep.ciudadano.nombre.split(' ')[0] + ' ' + (rep.ciudadano.nombre.split(' ')[1] ? rep.ciudadano.nombre.split(' ')[1][0] + '.' : '') : 'Ciudadano';

    const minutos = Math.floor((new Date() - rep.fecha) / (1000 * 60));
    let tiempoTexto = 'Hace instantes';
    if (minutos >= 60) {
      const horas = Math.floor(minutos / 60);
      tiempoTexto = `Hace ${horas} h`;
    } else if (minutos > 0) {
      tiempoTexto = `Hace ${minutos} min`;
    }

    return `
      <tr class="hover:bg-zinc-50/50 transition-colors border-b border-zinc-100">
        <td class="px-5 py-3 font-mono font-bold text-zinc-950">#${rep.kpId}</td>
        <td class="px-4 py-3">${nombreTipo}</td>
        <td class="px-4 py-3 text-zinc-500 font-medium">${reportante}</td>
        <td class="px-4 py-3 text-zinc-400 font-normal">${tiempoTexto}</td>
        <td class="px-4 py-3">${selectEstadoHtml}</td>
        <td class="px-4 py-3 text-zinc-800 font-bold font-sans">${accionTexto}</td>
      </tr>
    `;
  }).join('');

  document.querySelectorAll('.select-estado-inline-mod').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const nuevoEstado = e.target.value;
      actualizarEstadoCasoDirecto(id, nuevoEstado);
    });
  });
}

// 2. Render de la Tabla de Historial Completo (ESTRUCTURA ORIGINAL CON SELECT INLINE DE ESTADOS Y REGISTRO EN ACCIONES)
function renderizarTablaHistorial() {
  const tbody = document.getElementById('tabla-reportes-cuerpo');
  const histContadorTotal = document.getElementById('hist-contador-total');
  if (!tbody) return;

  const filtrados = obtenerReportesHistorialFiltrados();

  if (histContadorTotal) {
    histContadorTotal.textContent = `${filtrados.length} ${filtrados.length === 1 ? 'Incidente Registrado' : 'Incidentes Registrados'}`;
  }

  if (filtrados.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="py-12 text-center text-zinc-450 text-xs font-semibold">
          No se encontraron reportes que coincidan con los filtros de búsqueda establecidos.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtrados.map(rep => {
    // Definir los estilos de los tags sin emojis según el tipo de delito
    let badgeTipoClase = 'bg-zinc-100 text-zinc-700 border-zinc-200';
    if (rep.tipo === 'Robo') {
      badgeTipoClase = 'bg-red-50 text-red-700 border-red-200';
    } else if (rep.tipo === 'Hurto') {
      badgeTipoClase = 'bg-orange-50 text-orange-700 border-orange-200';
    } else if (rep.tipo === 'Amenazas y peleas') {
      badgeTipoClase = 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }

    // Select HTML inline para la columna ESTADO (Actualizar ahí mismo en la tabla!)
    let colorSelectClass = 'bg-[#fffbeb] text-amber-800 border-amber-200';
    if (rep.estadoCaso === 'Caso cerrado' || rep.estadoCaso === 'Completado') {
      colorSelectClass = 'bg-[#f0fdf4] text-emerald-800 border-[#bbf7d0]';
    } else if (rep.estadoCaso === 'En revisión') {
      colorSelectClass = 'bg-[#eff6ff] text-blue-800 border-[#bfdbfe]';
    } else if (rep.estadoCaso === 'visto') {
      colorSelectClass = 'bg-[#f4f4f5] text-zinc-700 border-zinc-200';
    }

    const selectEstadoHtml = `
      <div class="relative inline-block w-36">
        <select data-id="${rep.id}" class="select-estado-inline-hist appearance-none w-full ${colorSelectClass} border font-bold font-mono text-[9px] uppercase px-2.5 py-1.5 pr-7 rounded-md focus:outline-none cursor-pointer transition-colors duration-150">
          <option value="Pendiente" ${rep.estadoCaso === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          <option value="visto" ${rep.estadoCaso === 'visto' ? 'selected' : ''}>Visto</option>
          <option value="En revisión" ${rep.estadoCaso === 'En revisión' ? 'selected' : ''}>En revisión</option>
          <option value="Caso cerrado" ${rep.estadoCaso === 'Caso cerrado' || rep.estadoCaso === 'Completado' ? 'selected' : ''}>Caso cerrado</option>
        </select>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 text-current pointer-events-none">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
          </svg>
        </span>
      </div>
    `;

    // ACCIONES (Muestra el nombre del oficial que modifique el estado)
    const accionTexto = rep.accionPolicia || '—';

    // EVIDENCIAS (Visualizar imagen obligatoria de reporte)
    let evidenciaHtml = '<span class="text-zinc-300 font-mono">—</span>';
    if (rep.evidencia && rep.fotoEvidencia) {
      evidenciaHtml = `<button data-id="${rep.id}" class="btn-ver-evidencia text-[#ff5d00] hover:text-[#e05200] font-bold text-xs cursor-pointer bg-transparent border-none p-0">Ver adjunto</button>`;
    }

    const minutos = Math.floor((new Date() - rep.fecha) / (1000 * 60));
    let tiempoTexto = 'Hace instantes';
    if (minutos >= 60 * 24) {
      const dias = Math.floor(minutos / (60 * 24));
      tiempoTexto = `Hace ${dias} d`;
    } else if (minutos >= 60) {
      const horas = Math.floor(minutos / 60);
      tiempoTexto = `Hace ${horas} h`;
    } else if (minutos > 0) {
      tiempoTexto = `Hace ${minutos} min`;
    }

    // Estructura de fila adaptada: ID | TIPO | DESCRIPCIÓN | UBICACIÓN | FECHA | ESTADO (Select) | ACCIÓN (Auditor) | EVIDENCIA
    return `
      <tr class="hover:bg-zinc-50/50 transition-colors">
        <td class="px-5 py-3.5 text-xs font-bold text-zinc-950 font-mono tracking-tight">${rep.kpId}</td>
        
        <td class="px-4 py-3.5 text-xs font-bold">
          <span class="px-2.5 py-0.5 rounded border ${badgeTipoClase} inline-flex items-center font-semibold text-[10px]">
            <span>${rep.tipo}</span>
          </span>
        </td>

        <td class="px-4 py-3.5 text-xs text-zinc-650 font-normal max-w-[280px] truncate">${rep.descripcion}</td>
        <td class="px-4 py-3.5 text-xs text-zinc-650 font-medium">${rep.ubicacion} (${rep.barrio})</td>
        <td class="px-4 py-3.5 text-xs text-zinc-500 font-medium">${tiempoTexto}</td>
        
        <!-- ESTADO (Actualizar ahí mismo) -->
        <td class="px-4 py-3.5">
          ${selectEstadoHtml}
        </td>
        
        <!-- ACCIÓN (Nombre del que cambia los estados) -->
        <td class="px-4 py-3.5 text-xs text-zinc-800 font-bold font-sans">${accionTexto}</td>
        
        <!-- EVIDENCIAS (Ver adjunto obligatorio) -->
        <td class="px-6 py-3.5 text-center font-bold">
          ${evidenciaHtml}
        </td>
      </tr>
    `;
  }).join('');

  // Vincular cambio dinámico de estado en los select de la tabla
  document.querySelectorAll('.select-estado-inline-hist').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const nuevoEstado = e.target.value;
      actualizarEstadoCasoDirecto(id, nuevoEstado);
    });
  });

  // Vincular clic de "Ver adjunto" para el modal de evidencia
  document.querySelectorAll('.btn-ver-evidencia').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      abrirModalEvidencia(id);
    });
  });
}

/**
 * LÓGICA DE FILTRADO PARA HISTORIAL
 */
function obtenerReportesHistorialFiltrados() {
  const ahora = new Date();

  return reportes.filter(r => {
    if (filtroHistorialCategoria !== 'todos' && r.tipo !== filtroHistorialCategoria) {
      return false;
    }

    const msDiferencia = ahora - r.fecha;
    const diasTranscurridos = msDiferencia / (1000 * 60 * 60 * 24);

    if (filtroHistorialTiempo === 'dia') {
      return diasTranscurridos <= 1; // Hoy
    } else if (filtroHistorialTiempo === 'semana') {
      return diasTranscurridos <= 14; // 2 semanas
    } else if (filtroHistorialTiempo === 'mes') {
      return diasTranscurridos <= 30; // 30 días
    }

    return true;
  }).sort((a, b) => {
    if (ordenHistorialGravedad === 'gravedad-desc') {
      const gravedadVals = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
      return (gravedadVals[b.gravedad] || 0) - (gravedadVals[a.gravedad] || 0);
    } else if (ordenHistorialGravedad === 'gravedad-asc') {
      const gravedadVals = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
      return (gravedadVals[a.gravedad] || 0) - (gravedadVals[b.gravedad] || 0);
    } else if (ordenHistorialGravedad === 'fecha-desc') {
      return b.fecha - a.fecha;
    } else if (ordenHistorialGravedad === 'fecha-asc') {
      return a.fecha - b.fecha;
    }
    return 0;
  });
}

/**
 * Actualiza el estado de un reporte en memoria y registra al oficial responsable
 */
function actualizarEstadoCasoDirecto(id, nuevoEstado) {
  const caso = reportes.find(r => r.id === id);
  if (!caso) return;

  caso.estadoCaso = nuevoEstado;
  
  if (nuevoEstado !== 'Pendiente') {
    caso.accionPolicia = POLICIAL_LOGUEADO.nombre; // Registra a Javier A. Ortega Ruiz
  } else {
    caso.accionPolicia = '—';
  }

  Swal.fire({
    title: '¡Estado Actualizado!',
    text: `El caso ${caso.kpId} ha sido modificado a "${nuevoEstado}" por el oficial ${POLICIAL_LOGUEADO.nombre}.`,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#ff5d00',
    background: '#ffffff',
    color: '#09090b',
    customClass: {
      popup: 'border border-zinc-200 rounded-md shadow-none'
    }
  });

  renderizarTablaHistorial();
  renderizarTablaModeracion();
  renderizarAlertasRecientes();
  actualizarEstadisticasVisuales();
  actualizarMarcadoresEnMapa();
}

/**
 * Abre el modal de visualización de evidencia (Solo imagen, sin botones de publicación)
 */
function abrirModalEvidencia(id) {
  const caso = reportes.find(r => r.id === id);
  if (!caso) return;

  casoModalId = id;

  document.getElementById('modal-titulo-caso').innerHTML = `<span class="text-[#ff5d00] font-mono font-bold">EVIDENCIA ${caso.kpId}</span>`;
  
  const imgEvidencia = document.getElementById('modal-foto-evidencia');
  const labelArchivo = document.getElementById('modal-label-archivo');

  if (imgEvidencia && caso.fotoEvidencia) {
    imgEvidencia.src = caso.fotoEvidencia;
  }
  if (labelArchivo) {
    labelArchivo.textContent = `Evidencia_Caso_${caso.kpId}.jpg`;
  }

  const modal = document.getElementById('modal-detalle-caso');
  if (modal) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.remove('scale-95');
    modal.querySelector('div').classList.add('scale-100');
  }
}

/**
 * Cierra el modal de evidencia
 */
function cerrarModalEvidencia() {
  const modal = document.getElementById('modal-detalle-caso');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.remove('scale-100');
    modal.querySelector('div').classList.add('scale-95');
  }
  casoModalId = null;
}

/**
 * ==========================================
 * MANEJO DE EVENTOS, ACCIONES Y MODAL
 * ==========================================
 */
function enlazarEventosAcciones() {
  
  // NAVEGACIÓN EN SIDEBAR
  const navItems = document.querySelectorAll('#sidebar-navigation .nav-item');
  navItems.forEach(btn => {
    btn.addEventListener('click', (e) => {
      navItems.forEach(item => {
        item.classList.remove('bg-[#1a1a1a]', 'text-white', 'border', 'border-zinc-800');
        item.classList.add('text-zinc-400', 'hover:text-zinc-200', 'hover:bg-[#18181b]/50');
      });

      const clickedBtn = e.currentTarget;
      clickedBtn.classList.remove('text-zinc-400', 'hover:text-zinc-200', 'hover:bg-[#18181b]/50');
      clickedBtn.classList.add('bg-[#1a1a1a]', 'text-white', 'border', 'border-zinc-800');

      tabActivo = clickedBtn.getAttribute('data-tab');

      const viewEstadisticas = document.getElementById('view-estadisticas');
      const viewHistorial = document.getElementById('view-historial');
      const viewMapa = document.getElementById('view-mapa');

      if (tabActivo === 'Estadisticas') {
        if (viewEstadisticas) viewEstadisticas.classList.remove('hidden');
        if (viewHistorial) viewHistorial.classList.add('hidden');
        if (viewMapa) viewMapa.classList.add('hidden');
        
        actualizarEstadisticasVisuales();
        renderizarTablaModeracion();
      } else if (tabActivo === 'Historial') {
        if (viewEstadisticas) viewEstadisticas.classList.add('hidden');
        if (viewHistorial) viewHistorial.classList.remove('hidden');
        if (viewMapa) viewMapa.classList.add('hidden');
        
        renderizarTablaHistorial();
      } else if (tabActivo === 'Mapa') {
        if (viewEstadisticas) viewEstadisticas.classList.add('hidden');
        if (viewHistorial) viewHistorial.classList.add('hidden');
        if (viewMapa) viewMapa.classList.remove('hidden');

        if (mapInstance) {
          setTimeout(() => {
            mapInstance.invalidateSize();
          }, 100);
        }

        renderizarAlertasRecientes();
        actualizarMarcadoresEnMapa();
      }
    });
  });

  // Enlace desde la Cola de Moderación ("Ver todo el historial")
  const linkVerHistorial = document.getElementById('btn-ver-todo-historial');
  if (linkVerHistorial) {
    linkVerHistorial.addEventListener('click', () => {
      const btnHistorial = document.querySelector('#sidebar-navigation button[data-tab="Historial"]');
      if (btnHistorial) {
        btnHistorial.click();
      }
    });
  }

  // FILTROS EN LA PANTALLA DE ESTADÍSTICAS
  const selectEstTiempo = document.getElementById('est-filtro-tiempo');
  if (selectEstTiempo) {
    selectEstTiempo.addEventListener('change', (e) => {
      filtroEstadisticasTiempo = e.target.value;
      actualizarEstadisticasVisuales();
    });
  }

  // BOTÓN EXPORTAR REPORTE
  const btnExportar = document.getElementById('btn-exportar');
  if (btnExportar) {
    btnExportar.addEventListener('click', () => {
      Swal.fire({
        title: 'Exportando Datos...',
        text: 'Generando informe ejecutivo del cuadrante en formato PDF.',
        icon: 'info',
        timer: 1500,
        showConfirmButton: false,
        background: '#ffffff',
        color: '#09090b',
        customClass: {
          popup: 'border border-zinc-200 rounded-md shadow-none'
        }
      }).then(() => {
        Swal.fire({
          title: 'Informe Exportado',
          text: 'El reporte se ha descargado exitosamente.',
          icon: 'success',
          confirmButtonColor: '#ff5d00',
          background: '#ffffff',
          color: '#09090b',
          customClass: {
            popup: 'border border-zinc-200 rounded-md shadow-none'
          }
        });
      });
    });
  }

  // FILTROS EN LA PANTALLA DE HISTORIAL (TABLA)
  const selectHistCat = document.getElementById('hist-filtro-categoria');
  if (selectHistCat) {
    selectHistCat.addEventListener('change', (e) => {
      filtroHistorialCategoria = e.target.value;
      renderizarTablaHistorial();
    });
  }

  const selectHistTiempo = document.getElementById('hist-filtro-tiempo');
  if (selectHistTiempo) {
    selectHistTiempo.addEventListener('change', (e) => {
      filtroHistorialTiempo = e.target.value;
      renderizarTablaHistorial();
    });
  }

  const selectHistOrden = document.getElementById('hist-orden-gravedad');
  if (selectHistOrden) {
    selectHistOrden.addEventListener('change', (e) => {
      ordenHistorialGravedad = e.target.value;
      renderizarTablaHistorial();
    });
  }

  // CERRAR MODAL EDICIÓN COMPLETO
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');
  const btnCancelarModal = document.getElementById('btn-cerrar-modal-accion');
  if (btnCerrarModal) btnCerrarModal.addEventListener('click', cerrarModalEvidencia);
  if (btnCancelarModal) btnCancelarModal.addEventListener('click', cerrarModalEvidencia);

  const modal = document.getElementById('modal-detalle-caso');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        cerrarModalEvidencia();
      }
    });
  }

  // Botón Salir de Panel
  const btnSalir = document.getElementById('btn-salir');
  if (btnSalir) {
    btnSalir.addEventListener('click', () => {
      Swal.fire({
        title: '¿Confirmar Salida?',
        text: "Saldrás de la consola táctica de seguridad.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Salir',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#ff5d00',
        cancelButtonColor: '#f4f4f5',
        background: '#ffffff',
        color: '#09090b',
        customClass: {
          popup: 'border border-zinc-200 rounded-md shadow-none'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Sesión Finalizada',
            text: 'Has salido de forma segura.',
            icon: 'success',
            confirmButtonColor: '#ff5d00',
            background: '#ffffff',
            color: '#09090b',
            customClass: {
              popup: 'border border-zinc-200 rounded-md'
            }
          });
        }
      });
    });
  }
}

/**
 * ==========================================
 * MÉTODOS DE SOPORTE E HILOS DE TIEMPO
 * ==========================================
 */
function formatearFechaHumana(fecha) {
  const coderAhora = new Date();
  const diffMs = coderAhora - fecha;
  const mins = Math.floor(diffMs / (1000 * 60));
  const horas = Math.floor(diffMs / (1000 * 60 * 60));

  if (mins < 1) return 'Hace un momento';
  if (mins < 60) return `Hace ${mins} minutos`;
  if (horas < 24) return `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
  return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
}
