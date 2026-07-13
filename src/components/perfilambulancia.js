import Swal from 'sweetalert2';




const PARAMEDICO_LOGUEADO = {
  nombre: "Javier A. Ortega Ruiz",
  rango: "Paramédico de Emergencias",
  placa: "AP-773829",
  estacion: "Base de Despacho Central",
  division: "Atención Prehospitalaria y Trauma",
  tipoSangre: "O+",
  estado: "Online",
  fotoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256&h=256" 
};


const REPORTES_MOCK = [
  {
    id: 1,
    kpId: 'KP-9921',
    tipo: 'Accidente de Tránsito',
    subtipo: 'Colisión Vehicular con Lesionados',
    descripcion: 'Choque múltiple entre bus público y automóvil particular. Dos pacientes politraumatizados con heridas abiertas en extremidades superiores.',
    ubicacion: 'Calle 26 # 68-90',
    barrio: 'Salitre Greco',
    zona: 'Zona Centro',
    lat: 4.6540,
    lng: -74.0950,
    fecha: new Date(Date.now() - 3 * 60 * 1000), 
    gravedad: 'Alta',
    estadoCaso: 'Caso cerrado',
    accionPolicia: 'Carlos Restrepo', 
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 1.018.472.938',
      nombre: 'Diana Patricia Cruz Medina',
      direccion: 'Calle 26 # 68-90 Apto 402',
      barrio: 'Salitre'
    }
  },
  {
    id: 2,
    kpId: 'KP-9919',
    tipo: 'Paro Cardiorespiratorio',
    subtipo: 'Emergencia Cardiovascular',
    descripcion: 'Paciente masculino de 64 años presenta dolor torácico agudo con irradiación a miembro superior izquierdo y pérdida del estado de alerta.',
    ubicacion: 'Avenida 68 # 53-80',
    barrio: 'Chapinero Centro',
    zona: 'Zona Centro',
    lat: 4.5980,
    lng: -74.0930,
    fecha: new Date(Date.now() - 17 * 60 * 1000), 
    gravedad: 'Alta',
    estadoCaso: 'En revisión',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 79.847.291',
      nombre: 'Luis Alberto Morales Gómez',
      direccion: 'Avenida Caracas # 53-80 Local 1',
      barrio: 'Chapinero Centro'
    }
  },
  {
    id: 3,
    kpId: 'KP-9915',
    tipo: 'Trauma y Caídas',
    subtipo: 'Fractura por Caída',
    descripcion: 'Paciente femenina de 72 años sufre caída desde su propia altura en baño residencial. Evidencia deformidad y dolor agudo en cadera derecha.',
    ubicacion: 'Calle 100 # 19-45',
    barrio: 'Usaquén Industrial',
    zona: 'Zona Norte',
    lat: 4.6860,
    lng: -74.0480,
    fecha: new Date(Date.now() - 48 * 60 * 1000), 
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
    kpId: 'KP-9910',
    tipo: 'Accidente de Tránsito',
    subtipo: 'Choque Simple / Trauma Cervical',
    descripcion: 'Colisión por alcance entre dos vehículos particulares. Conductor de automóvil delantero refiere dolor cervical y mareo moderado.',
    ubicacion: 'Carrera 7 # 45-10',
    barrio: 'Las Nieves',
    zona: 'Zona Centro',
    lat: 4.6010,
    lng: -74.0720,
    fecha: new Date(Date.now() - 150 * 60 * 1000), 
    gravedad: 'Alta',
    estadoCaso: 'En revisión',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 52.987.342',
      nombre: 'Sandra Milena Rojas Soto',
      direccion: 'Carrera 7 # 12-50 Local 3',
      barrio: 'Las Nieves'
    }
  },
  {
    id: 5,
    kpId: 'KP-9905',
    tipo: 'Trauma y Caídas',
    subtipo: 'Caída de Altura con Trauma Craneal',
    descripcion: 'Pintor de fachadas cae de andamio a una altura aproximada de 3 metros. Presenta herida contuso-cortante en región occipital y desorientación.',
    ubicacion: 'Autopista Norte # 82-10',
    barrio: 'El Lago',
    zona: 'Zona Norte',
    lat: 4.6670,
    lng: -74.0550,
    fecha: new Date(Date.now() - 12 * 24 * 3600 * 1000), 
    gravedad: 'Media',
    estadoCaso: 'visto',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 80.124.957',
      nombre: 'Andrés Felipe Restrepo Prada',
      direccion: 'Carrera 15 # 82-12',
      barrio: 'El Lago'
    }
  },
  {
    id: 6,
    kpId: 'KP-9902',
    tipo: 'Paro Cardiorespiratorio',
    subtipo: 'Pérdida de Conocimiento Súbita',
    descripcion: 'Paciente femenina de 45 años pierde el conocimiento de forma súbita mientras realizaba compras en supermercado. Sin pulso radial perceptible inicialmente.',
    ubicacion: 'Avenida Suba # 115-10',
    barrio: 'Niza Sur',
    zona: 'Zona Norte',
    lat: 4.7010,
    lng: -74.0750,
    fecha: new Date(Date.now() - 25 * 24 * 3600 * 1000), 
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
    kpId: 'KP-9901',
    tipo: 'Trauma y Caídas',
    subtipo: 'Herida por Objeto Cortopunzante',
    descripcion: 'Paciente de 28 años herido en muslo izquierdo con objeto metálico cortante durante labores de carpintería. Hemorragia controlada con vendaje de compresión.',
    ubicacion: 'Carrera 15 # 104-10',
    barrio: 'Chicó',
    zona: 'Zona Norte',
    lat: 4.6650,
    lng: -74.0580,
    fecha: new Date(Date.now() - 28 * 24 * 3600 * 1000), 
    gravedad: 'Media',
    estadoCaso: 'En revisión',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 1.020.448.917',
      nombre: 'Juan Camilo Herrera Rojas',
      direccion: 'Calle 105 # 16-12 Apto 301',
      barrio: 'Chicó'
    }
  }
];


let reportes = [];


async function cargarReportesDesdeAPI() {
  
  
  

  
  reportes = REPORTES_MOCK.map(r => ({
    ...r,
    fecha: r.fecha instanceof Date ? r.fecha : new Date(r.fecha)
  }));
}


let mapInstance = null;
let mapMarkers = [];


let tabActivo = 'Estadisticas'; 


let filtroHistorialTiempo = 'todo';
let filtroHistorialCategoria = 'todos';
let ordenHistorialGravedad = 'fecha-desc';


let filtroEstadisticasTiempo = '3dias';


let casoModalId = null;


export async function inicializarDashboard() {
  const app = document.getElementById('app');
  if (!app) return;

  await cargarReportesDesdeAPI();

  app.innerHTML = `
    <div class="flex min-h-screen bg-[#f4f4f5] text-zinc-950 font-sans selection:bg-[#3b82f6] selection:text-white">
      
      <!-- BARRA LATERAL (Negro Sólido, Sin Degradados, Bordes de 1px) -->
      <aside class="w-72 bg-[#000000] text-zinc-300 flex flex-col justify-between border-r border-zinc-800 shrink-0 select-none">
        <div>
          <!-- Logo de la Aplicación (keeperR) -->
          <div class="p-6 flex items-center gap-3 border-b border-zinc-800">
            <div class="bg-[#3b82f6] text-white p-2 rounded-md font-bold w-9 h-9 flex items-center justify-center text-lg tracking-wider">
              K
            </div>
            <div>
              <div class="text-[9px] uppercase font-mono tracking-widest text-zinc-550 leading-none">PANEL</div>
              <div class="text-lg font-bold text-white tracking-tight mt-0.5">keeperR</div>
            </div>
          </div>

          <!-- PERFIL DEL PARAMÉDICO LOGUEADO (Azul Sólido Minimalista, Bordes de 6px/8px, Sin Degradados) -->
          <div class="m-4 p-4 rounded-md bg-[#09152b] border border-[#3b82f6]/25 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8]"></div>
            
            <div class="flex items-center justify-between">
              <div class="relative">
                <img src="${PARAMEDICO_LOGUEADO.fotoUrl}" alt="Oficial" class="w-11 h-11 object-cover rounded-full border border-[#3b82f6]/40">
                <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#3b82f6] border-2 border-[#09152b]"></span>
              </div>
              <div class="min-w-0 flex-1 ml-3">
                <div class="text-[8px] uppercase tracking-widest text-[#3b82f6] font-bold font-mono">USUARIO</div>
                <div class="text-xs font-semibold text-zinc-100 truncate">${PARAMEDICO_LOGUEADO.nombre}</div>
                <div class="text-[9px] text-zinc-400 font-mono mt-0.5">Despacho activo</div>
              </div>
              <div class="shrink-0 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] font-bold uppercase font-mono px-2 py-0.5 rounded-md">
                Online
              </div>
            </div>
          </div>

          <!-- NAVEGACIÓN MODIFICADA -->
          <nav class="px-3 space-y-1" id="sidebar-navigation">
            
            <button data-tab="Estadisticas" class="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-all text-white bg-[#1a1a1a] border border-zinc-800">
              <!-- Icono Estadísticas -->
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2"></path>
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
              <span class="text-[9px] uppercase font-mono tracking-widest text-zinc-400 font-bold leading-none">MONITOREO MÉDICO</span>
              <h2 class="text-xl font-bold text-zinc-900 tracking-tight mt-1">Resumen Estratégico</h2>
              <p class="text-xs text-zinc-555 mt-0.5">Seguimiento de incidentes en tiempo real y métricas de despacho de ambulancias.</p>
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
                <span class="text-[9px] uppercase font-mono tracking-widest text-zinc-400 font-bold">DESPACHO DE EMERGENCIAS SEMANAL</span>
                <span class="inline-flex items-center bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md text-[9px] font-bold">
                  +15.2% vs mes anterior
                </span>
              </div>

              <!-- Gráfico Ficticio en HTML/CSS Puro (Azul Ambulancia) -->
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
                    <div class="bg-[#3b82f6] w-6 rounded-t-sm transition-all duration-350" style="height: 45%" id="chart-bar-lun"></div>
                  </div>
                  <!-- MAR -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-mar">48</div>
                    <div class="bg-[#3b82f6] w-6 rounded-t-sm transition-all duration-350" style="height: 60%" id="chart-bar-mar"></div>
                  </div>
                  <!-- MIÉ -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-mie">22</div>
                    <div class="bg-[#3b82f6] w-6 rounded-t-sm transition-all duration-350" style="height: 30%" id="chart-bar-mie"></div>
                  </div>
                  <!-- JUE -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-jue">61</div>
                    <div class="bg-[#3b82f6] w-6 rounded-t-sm transition-all duration-350" style="height: 75%" id="chart-bar-jue"></div>
                  </div>
                  <!-- VIE -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-vie">39</div>
                    <div class="bg-[#3b82f6] w-6 rounded-t-sm transition-all duration-350" style="height: 50%" id="chart-bar-vie"></div>
                  </div>
                  <!-- SÁB -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-sab">72</div>
                    <div class="bg-[#3b82f6] w-6 rounded-t-sm transition-all duration-350" style="height: 85%" id="chart-bar-sab"></div>
                  </div>
                  <!-- DOM -->
                  <div class="flex flex-col items-center gap-2 group w-12">
                    <div class="text-[9px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" id="chart-val-dom">85</div>
                    <div class="bg-[#3b82f6] w-6 rounded-t-sm transition-all duration-350" style="height: 95%" id="chart-bar-dom"></div>
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
              
              <!-- CARD: SERVICIOS MEDICOS ACTIVOS -->
              <div class="bg-white rounded-lg p-6 border border-zinc-200 flex flex-col justify-between h-[138px]">
                <div class="flex justify-between items-start">
                  <span class="text-[9px] uppercase font-mono tracking-widest text-zinc-400 font-bold">Servicios Médicos Activos</span>
                  <span class="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-[#3b82f6] text-[8px] font-bold uppercase font-mono px-2 py-0.5 rounded-md animate-pulse">
                    ● En vivo
                  </span>
                </div>
                <div class="text-4xl font-extrabold text-zinc-950 mt-2" id="val-incidentes-activos">18</div>
                
                <div class="border-t border-zinc-100 pt-2 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                  <span>TIEMPO MEDIO DE ARRIBO</span>
                  <span class="font-bold text-zinc-800 text-[10px]">6m 45s</span>
                </div>
              </div>

              <!-- CARD: INCIDENTES POR SECTOR -->
              <div class="bg-white rounded-lg p-6 border border-zinc-200 flex flex-col justify-between h-[138px]">
                <span class="text-[9px] uppercase font-mono tracking-widest text-zinc-400 font-bold block mb-2">REPORTES POR SECTOR</span>
                
                <div class="space-y-2 text-[10px] font-medium text-zinc-700">
                  <div class="space-y-0.5">
                    <div class="flex justify-between font-semibold">
                      <span>Sector Norte</span>
                      <span id="sector-norte-val">22</span>
                    </div>
                    <div class="w-full bg-zinc-100 h-1.5 rounded-sm overflow-hidden">
                      <div class="bg-[#3b82f6] h-full rounded-sm" style="width: 22%" id="sector-norte-bar"></div>
                    </div>
                  </div>

                  <div class="space-y-0.5">
                    <div class="flex justify-between font-semibold">
                      <span>Plaza Central</span>
                      <span id="sector-central-val">19</span>
                    </div>
                    <div class="w-full bg-zinc-100 h-1.5 rounded-sm overflow-hidden">
                      <div class="bg-[#3b82f6] h-full rounded-sm" style="width: 19%" id="sector-central-bar"></div>
                    </div>
                  </div>

                  <div class="space-y-0.5">
                    <div class="flex justify-between font-semibold">
                      <span>Zona Industrial</span>
                      <span id="sector-industrial-val">44</span>
                    </div>
                    <div class="w-full bg-zinc-100 h-1.5 rounded-sm overflow-hidden">
                      <div class="bg-[#3b82f6] h-full rounded-sm" style="width: 44%" id="sector-industrial-bar"></div>
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
                <p class="text-[11px] text-zinc-400">Filtrar y verificar llamadas médicas de urgencia.</p>
              </div>
              <button id="btn-ver-todo-historial" class="text-[#3b82f6] hover:text-[#1d4ed8] font-bold text-[10px] transition-colors select-none">
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
        <!-- VISTA DE HISTORIAL (ESTRUCTURA ORIGINAL CON SELECT INLINE) -->
        <!-- ======================================================= -->
        <div id="view-historial" class="hidden bg-white rounded-lg p-6 md:p-8 border border-zinc-200 w-full flex flex-col justify-between min-h-[600px]">
          
          <div>
            <!-- Cabecera de la Sección -->
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-zinc-100">
              <div>
                <span class="text-[9px] uppercase font-mono tracking-widest text-zinc-400 font-bold leading-none">HISTORIAL</span>
                <h2 class="text-xl font-bold text-zinc-900 tracking-tight mt-1">Historial de Reportes</h2>
                <p class="text-xs text-zinc-555 mt-0.5">Listado de incidentes viales, colisiones y emergencias prehospitalarias.</p>
              </div>

              <!-- Controles de Filtros Dinámicos colocados arriba -->
              <div class="flex flex-wrap items-center gap-3">
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
                    <th class="text-left text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">ACCIÓN</th>
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
            <span>Terminal Central de Despacho de Ambulancias</span>
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
                  <div class="text-[9px] uppercase tracking-wider text-zinc-400 font-bold leading-none">Ruta de Emergencia</div>
                  <div class="text-xs font-bold text-zinc-950 mt-0.5">Jurisdicción: Mapa de Despacho</div>
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
              <div class="bg-[#3b82f6] text-white px-5 py-2.5 rounded-md flex flex-col justify-center pointer-events-auto border border-[#3b82f6]">
                <span class="text-[8px] uppercase tracking-widest opacity-90 font-bold font-mono">Filtro Activo</span>
                <span id="map-alert-text" class="text-xs font-bold mt-0.5">Todas las emergencias</span>
              </div>
            </div>

          </div>

          <!-- COLUMNA DE ALERTAS RECIENTES -->
          <div class="xl:col-span-4 bg-white rounded-lg p-6 border border-zinc-200 flex flex-col justify-between h-[650px]">
            
            <div class="flex items-center justify-between border-b border-zinc-200 pb-3">
              <div>
                <div class="text-[9px] uppercase tracking-widest text-zinc-400 font-bold font-mono">EN VIVO</div>
                <h3 class="text-sm font-bold text-zinc-950 mt-0.5">Llamadas Médicas Activas</h3>
              </div>
            </div>

            <div id="lista-alertas-recientes" class="flex-1 my-3 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              <!-- Se inyecta mediante JS -->
            </div>

            <div class="text-[9px] text-zinc-400 font-mono pt-2 border-t border-zinc-200 flex justify-between items-center">
              <span>Central de Emergencias 123 Médica</span>
              <span id="contador-alertas" class="font-bold text-zinc-800">-- Incidentes</span>
            </div>

          </div>

        </div>

      </main>

      <!-- MODAL DETALLE DE CASO & EVIDENCIA FOTOGRÁFICA -->
      <div id="modal-detalle-caso" class="fixed inset-0 bg-black/60 backdrop-blur-none z-50 flex items-center justify-center opacity-0 pointer-events-none transition-all duration-150 p-4">
        <div class="bg-white border border-zinc-200 rounded-lg w-full max-w-lg overflow-hidden transform scale-95 transition-all duration-150">
          
          <!-- Encabezado Modal -->
          <div class="p-4 border-b border-zinc-150 flex items-center justify-between bg-zinc-50/50">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#3b82f6]"></span>
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
              <img id="modal-foto-evidencia" src="" alt="Evidencia Médica" class="w-full h-full object-cover">
            </div>
            
            <div class="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
              <span id="modal-label-archivo">Evidencia_Ambulancia.jpg</span>
              <span class="font-bold text-zinc-500">Registro Clínico Primario</span>
            </div>

            <!-- Botón de Cerrar -->
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

  
  inicializarMapaVea();
  actualizarEstadisticasVisuales();
  renderizarTablaHistorial();
  renderizarTablaModeracion();
  renderizarAlertasRecientes();
  enlazarEventosAcciones();
}


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

  
  if (window.currentMapInstance) {
    try {
      window.currentMapInstance.remove();
    } catch (e) {
      console.warn("Error al remover instancia de mapa anterior:", e);
    }
    window.currentMapInstance = null;
  }

  const latBase = 4.6350;
  const lngBase = -74.0720;

  const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: true
  }).setView([latBase, lngBase], 12);

  window.currentMapInstance = map;
  mapInstance = map;

  L.control.zoom({
    position: 'bottomleft'
  }).addTo(mapInstance);

  
  
  
  
  

  
  
  

  actualizarMarcadoresEnMapa();
}


function actualizarMarcadoresEnMapa() {
  if (!mapInstance) return;

  mapMarkers.forEach(m => mapInstance.removeLayer(m));
  mapMarkers = [];

  reportes.forEach(rep => {
    if (!rep.lat || !rep.lng) return;

    let colorClase = 'bg-blue-500';
    if (rep.tipo === 'Accidente de Tránsito') colorClase = 'bg-blue-600';
    else if (rep.tipo === 'Paro Cardiorespiratorio') colorClase = 'bg-red-500';
    else if (rep.tipo === 'Trauma y Caídas') colorClase = 'bg-amber-500';

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
          <span class="font-bold text-xs uppercase text-[#3b82f6]">${rep.tipo}</span>
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


function actualizarEstadisticasVisuales() {
  const activeValEl = document.getElementById('val-incidentes-activos');
  if (!activeValEl) return;

  const activosTotales = reportes.filter(r => r.estadoCaso !== 'Caso cerrado').length;
  activeValEl.textContent = `${activosTotales + 13}`;

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

  const secNorte = Math.round(22 * (factor * 0.85));
  const secCentral = Math.round(19 * (factor * 0.90));
  const secIndustrial = Math.round(44 * (factor * 0.75));

  const totalSectores = secNorte + secCentral + secIndustrial;

  const nEl = document.getElementById('sector-norte-val');
  const nBar = document.getElementById('sector-norte-bar');
  if (nEl && nBar) {
    nEl.textContent = secNorte;
    nBar.style.width = `${totalSectores > 0 ? (secNorte / totalSectores) * 100 : 22}%`;
  }

  const cEl = document.getElementById('sector-central-val');
  const cBar = document.getElementById('sector-central-bar');
  if (cEl && cBar) {
    cEl.textContent = secCentral;
    cBar.style.width = `${totalSectores > 0 ? (secCentral / totalSectores) * 100 : 19}%`;
  }

  const iEl = document.getElementById('sector-industrial-val');
  const iBar = document.getElementById('sector-industrial-bar');
  if (iEl && iBar) {
    iEl.textContent = secIndustrial;
    iBar.style.width = `${totalSectores > 0 ? (secIndustrial / totalSectores) * 100 : 44}%`;
  }
}


function renderizarAlertasRecientes() {
  const contenedorListado = document.getElementById('lista-alertas-recientes');
  const contadorAlertas = document.getElementById('contador-alertas');
  if (!contenedorListado) return;

  if (contadorAlertas) {
    contadorAlertas.textContent = `${reportes.length} Incidentes`;
  }

  contenedorListado.innerHTML = reportes.slice().sort((a, b) => b.fecha - a.fecha).map(rep => {
    let colorEtiqueta = 'text-[#3b82f6]';
    let textoEtiqueta = 'Urgente';

    if (rep.gravedad === 'Alta') {
      colorEtiqueta = 'text-blue-600 font-bold';
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

  document.querySelectorAll('.item-alerta').forEach(item => {
    item.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const rep = reportes.find(r => r.id === id);
      if (rep && mapInstance && rep.lat && rep.lng) {
        mapInstance.setView([rep.lat, rep.lng], 15, { animate: true });
        
        const marker = mapMarkers.find(m => {
          const latlng = m.getLatLng();
          return Math.abs(latlng.lat - rep.lat) < 0.0001 && Math.abs(latlng.lng - rep.lng) < 0.0001;
        });

        if (marker) {
          marker.openPopup();
        }
      }
    });
  });
}




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
        <td class="px-4 py-3 text-zinc-555 font-medium">${reportante}</td>
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
    
    let badgeTipoClase = 'bg-zinc-100 text-zinc-700 border-zinc-200';
    if (rep.tipo === 'Accidente de Tránsito') {
      badgeTipoClase = 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (rep.tipo === 'Paro Cardiorespiratorio') {
      badgeTipoClase = 'bg-red-50 text-red-700 border-red-200';
    } else if (rep.tipo === 'Trauma y Caídas') {
      badgeTipoClase = 'bg-amber-50 text-amber-700 border-amber-200';
    }

    
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

    
    const accionTexto = rep.accionPolicia || '—';

    
    let evidenciaHtml = '<span class="text-zinc-300 font-mono">—</span>';
    if (rep.evidencia && rep.fotoEvidencia) {
      evidenciaHtml = `<button data-id="${rep.id}" class="btn-ver-evidencia text-[#3b82f6] hover:text-[#1d4ed8] font-bold text-xs cursor-pointer bg-transparent border-none p-0">Ver adjunto</button>`;
    }

    const minutes = Math.floor((new Date() - rep.fecha) / (1000 * 60));
    let tiempoTexto = 'Hace instantes';
    if (minutes >= 60 * 24) {
      const dias = Math.floor(minutes / (60 * 24));
      tiempoTexto = `Hace ${dias} d`;
    } else if (minutes >= 60) {
      const horas = Math.floor(minutes / 60);
      tiempoTexto = `Hace ${horas} h`;
    } else if (minutes > 0) {
      tiempoTexto = `Hace ${minutes} min`;
    }

    
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
        
        <!-- EVIDENCIAS -->
        <td class="px-6 py-3.5 text-center font-bold">
          ${evidenciaHtml}
        </td>
      </tr>
    `;
  }).join('');

  
  document.querySelectorAll('.select-estado-inline-hist').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const nuevoEstado = e.target.value;
      actualizarEstadoCasoDirecto(id, nuevoEstado);
    });
  });

  
  document.querySelectorAll('.btn-ver-evidencia').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      abrirModalEvidencia(id);
    });
  });
}


function obtenerReportesHistorialFiltrados() {
  const ahora = new Date();

  return reportes.filter(r => {
    if (filtroHistorialCategoria !== 'todos' && r.tipo !== filtroHistorialCategoria) {
      return false;
    }

    const msDiferencia = ahora - r.fecha;
    const diasTranscurridos = msDiferencia / (1000 * 60 * 60 * 24);

    if (filtroHistorialTiempo === 'dia') {
      return diasTranscurridos <= 1; 
    } else if (filtroHistorialTiempo === 'semana') {
      return diasTranscurridos <= 14; 
    } else if (filtroHistorialTiempo === 'mes') {
      return diasTranscurridos <= 30; 
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


function actualizarEstadoCasoDirecto(id, nuevoEstado) {
  const caso = reportes.find(r => r.id === id);
  if (!caso) return;

  caso.estadoCaso = nuevoEstado;
  
  if (nuevoEstado !== 'Pendiente') {
    caso.accionPolicia = PARAMEDICO_LOGUEADO.nombre; 
  } else {
    caso.accionPolicia = '—';
  }

  Swal.fire({
    title: '¡Estado Actualizado!',
    text: `El caso ${caso.kpId} ha sido modificado a "${nuevoEstado}" por el paramédico ${PARAMEDICO_LOGUEADO.nombre}.`,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#3b82f6',
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


function abrirModalEvidencia(id) {
  const caso = reportes.find(r => r.id === id);
  if (!caso) return;

  casoModalId = id;

  document.getElementById('modal-titulo-caso').innerHTML = `<span class="text-[#3b82f6] font-mono font-bold">EVIDENCIA ${caso.kpId}</span>`;
  
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


function cerrarModalEvidencia() {
  const modal = document.getElementById('modal-detalle-caso');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.remove('scale-100');
    modal.querySelector('div').classList.add('scale-95');
  }
  casoModalId = null;
}


function enlazarEventosAcciones() {
  
  
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

  
  const linkVerHistorial = document.getElementById('btn-ver-todo-historial');
  if (linkVerHistorial) {
    linkVerHistorial.addEventListener('click', () => {
      const btnHistorial = document.querySelector('#sidebar-navigation button[data-tab="Historial"]');
      if (btnHistorial) {
        btnHistorial.click();
      }
    });
  }

  
  const selectEstTiempo = document.getElementById('est-filtro-tiempo');
  if (selectEstTiempo) {
    selectEstTiempo.addEventListener('change', (e) => {
      filtroEstadisticasTiempo = e.target.value;
      actualizarEstadisticasVisuales();
    });
  }

  
  const btnExportar = document.getElementById('btn-exportar');
  if (btnExportar) {
    btnExportar.addEventListener('click', () => {
      Swal.fire({
        title: 'Exportando Datos...',
        text: 'Generando informe prehospitalario del cuadrante médico en formato PDF.',
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
          text: 'El reporte médico se ha descargado exitosamente.',
          icon: 'success',
          confirmButtonColor: '#3b82f6',
          background: '#ffffff',
          color: '#09090b',
          customClass: {
            popup: 'border border-zinc-200 rounded-md shadow-none'
          }
        });
      });
    });
  }

  
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

  
  const btnSalir = document.getElementById('btn-salir');
  if (btnSalir) {
    btnSalir.addEventListener('click', () => {
      Swal.fire({
        title: '¿Confirmar Salida?',
        text: "Saldrás de la consola táctica de emergencias médicas.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Salir',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3b82f6',
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
            confirmButtonColor: '#3b82f6',
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
