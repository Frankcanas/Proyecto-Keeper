import { renderFeed } from './feed/feedTemplate.js';
import { feedState } from './feed/feedState.js';
import { renderUsersTable, openUserFormModal } from './feed/feedUsers.js';
import { renderReportesFeedTable, renderHistorialReportesTable } from './feed/feedReports.js';
import { exportReportToPDF } from './feed/feedPdf.js';
import Swal from 'sweetalert2';

export { renderFeed };

// -------------------------------------------------------------
// CONTROLADOR DE PESTAÑAS (TABS) & MAPAS
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
    feedState.showingThreeDays = !feedState.showingThreeDays;
    const currentData = feedState.showingThreeDays ? feedState.data3Days : feedState.data30Days;
    
    // Cambiar texto del botón
    btnToggleDays.textContent = feedState.showingThreeDays ? 'Últimos 30 días' : 'Últimos 3 días';
    
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
    feedState.listReportesFeed = JSON.parse(JSON.stringify(currentData.reports));
    renderReportesFeedTable();

    // Notificación toast informativa
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: `Visualizando datos de los ${feedState.showingThreeDays ? 'últimos 3 días' : 'últimos 30 días'}`,
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

  // Buscador de direcciones en el mapa (Nominatim / Leaflet Integration)
  const mapSearchInput = document.getElementById('map-search-input');
  mapSearchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (!query) return;

      // Usar Nominatim para buscar la dirección
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            // Alerta sutil / Toast indicando localización
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: `Ubicación: ${data[0].display_name.split(',')[0]}`,
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              customClass: { popup: 'rounded border border-zinc-200 bg-white font-sans text-xs' }
            });

            // Si hay un mapa real instanciado de Leaflet o Google Maps
            if (window.map && typeof window.map.flyTo === 'function') {
              window.map.flyTo([lat, lon], 16);
              
              if (window.L && typeof window.L.marker === 'function') {
                if (window.currentSearchMarker) {
                  window.currentSearchMarker.remove();
                }
                window.currentSearchMarker = window.L.marker([lat, lon]).addTo(window.map)
                  .bindPopup(`<b>${query}</b><br>${data[0].display_name}`)
                  .openPopup();
              }
            } else if (window.googleMap && typeof window.googleMap.setCenter === 'function') {
              window.googleMap.setCenter({ lat, lng: lon });
              window.googleMap.setZoom(17);
            } else {
              console.log(`[Mapa Simulado] Volando a: Lat ${lat}, Lon ${lon} (${data[0].display_name})`);
            }
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'No se encontró la dirección',
              showConfirmButton: false,
              timer: 2000,
              customClass: { popup: 'rounded border border-zinc-200 bg-white font-sans text-xs' }
            });
          }
        })
        .catch(err => {
          console.error('Error buscando dirección:', err);
        });
    }
  });
}

// -------------------------------------------------------------
// ENTRADA DE REPORTES DESDE EXTERNOS (HOMEPAGE / SOS)
// -------------------------------------------------------------
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
  feedState.listReportesFeed.unshift(feedReport);

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
  feedState.listHistorialReportes.unshift(historyReport);

  // Si las tablas están actualmente dibujadas en el DOM, las refrescamos
  renderReportesFeedTable();
  renderHistorialReportesTable();
}
