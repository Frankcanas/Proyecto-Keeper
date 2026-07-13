import { formatearFechaHumana } from '../utils/helpers.js';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

let mapInstance = null;
let mapMarkers = [];

export function inicializarMapaVea(reportes) {
  const latBase = 4.6350;
  const lngBase = -74.0720;

  mapInstance = new maplibregl.Map({
    container: 'map',
    style: 'https://tiles.openfreemap.org/styles/liberty',
    center: [lngBase, latBase],
    zoom: 12,
    attributionControl: false
  });

  mapInstance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-left');

  actualizarMarcadoresEnMapa(reportes);
}

export function actualizarMarcadoresEnMapa(reportes) {
  if (!mapInstance) return;

  mapMarkers.forEach(m => m.remove());
  mapMarkers = [];

  reportes.forEach(rep => {
    if (!rep.lat || !rep.lng) return;

    let colorClase = 'bg-blue-500';
    if (rep.tipo === 'Robo') colorClase = 'bg-red-650';
    else if (rep.tipo === 'Hurto') colorClase = 'bg-[#ff5d00]';
    else if (rep.tipo === 'Amenazas y peleas') colorClase = 'bg-yellow-500';

    const el = document.createElement('div');
    // Using Tailwind classes from the original setup, plus explicit sizes
    el.className = `w-6 h-6 rounded-full ${colorClase} border-2 border-white flex items-center justify-center shadow cursor-pointer`;
    el.style.width = '26px';
    el.style.height = '26px';
    el.innerHTML = '<span class="w-1.5 h-1.5 bg-white rounded-full"></span>';

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

    const popup = new maplibregl.Popup({ offset: 15, closeButton: false }).setHTML(popupHtml);

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([rep.lng, rep.lat])
      .setPopup(popup)
      .addTo(mapInstance);

    mapMarkers.push(marker);
  });
}
