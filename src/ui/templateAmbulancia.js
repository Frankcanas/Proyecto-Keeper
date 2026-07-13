export function getDashboardTemplate(usuario) {
  return `  
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
                <img src="${usuario.fotoUrl}" alt="Oficial" class="w-11 h-11 object-cover rounded-full border border-[#3b82f6]/40">
                <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#3b82f6] border-2 border-[#09152b]"></span>
              </div>
              <div class="min-w-0 flex-1 ml-3">
                <div class="text-[8px] uppercase tracking-widest text-[#3b82f6] font-bold font-mono">USUARIO</div>
                <div class="text-xs font-semibold text-zinc-100 truncate">${usuario.nombre}</div>
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
}
