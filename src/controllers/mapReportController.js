import { createReportMarker } from "../components/mapDiv";
import { formatearFechaHumana } from "../utils/helpers.js";

// Estado aislado únicamente para los marcadores de reportes
const reportState = {
    markers: [],
};

/**
 * Filtra, limpia y renderiza nuevos marcadores de reportes sobre una instancia de mapa activa
 * @param {Object} mapInstance - Instancia de MapLibre GL
 * @param {Array} reports - Listado de objetos de reportes/incidentes
 */
export function updateReportMarkers(mapInstance, reports) {
    if (!mapInstance) {
        console.warn(
            "Cannot render markers. Provided map instance is invalid or not initialized.",
        );
        return;
    }

    // 1. Limpieza estricta de marcadores previos para liberar memoria
    clearReportMarkers();

    // 2. Renderizado de nuevos marcadores
    reports.forEach((rep) => {
        if (!rep.lat || !rep.lng) return;

        // Selección dinámica de estilos visuales
        let colorClass = "bg-blue-500";
        if (rep.tipo === "Robo") colorClass = "bg-red-650";
        else if (rep.tipo === "Hurto") colorClass = "bg-[#ff5d00]";
        else if (rep.tipo === "Amenazas y peleas") colorClass = "bg-yellow-500";

        // Creación del elemento del DOM personalizado
        const el = document.createElement("div");
        el.className = `w-6 h-6 rounded-full ${colorClass} border-2 border-white flex items-center justify-center shadow cursor-pointer`;
        el.style.width = "26px";
        el.style.height = "26px";
        el.innerHTML =
            '<span class="w-1.5 h-1.5 bg-white rounded-full"></span>';

        // Estructura HTML del Popup nativo
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

        // Generar marcador utilizando la abstracción visual de mapDiv
        const marker = createReportMarker(
            mapInstance,
            [rep.lng, rep.lat],
            el,
            popupHtml,
        );
        reportState.markers.push(marker);
    });
}

/**
 * Remueve físicamente todos los marcadores del mapa y vacía el arreglo de estado
 */
export function clearReportMarkers() {
    reportState.markers.forEach((marker) => marker.remove());
    reportState.markers = [];
}
