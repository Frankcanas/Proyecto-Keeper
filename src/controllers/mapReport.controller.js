import {
    initMap,
    getMap,
    startRealTimeTracking,
} from "./mapManager.controller";
import { createReportMarker } from "../components/mapComponent/mapView.js";
import { formatearFechaHumana } from "../utils/helpers.js";

let map = null;
export let mapMarkers = [];

export async function inicializarMapaVea(reportes, containerId = "map") {
    await initMap(containerId);
    actualizarMarcadoresEnMapa(reportes);
}

export function actualizarMarcadoresEnMapa(reportes) {
    const map = getMap();

    if (!map) return;

    mapMarkers.forEach((m) => m.remove());
    mapMarkers = [];

    reportes.forEach((rep) => {
        if (!rep.lat || !rep.lng) return;

        let colorClase = "bg-blue-500";
        if (rep.tipo === "Robo") colorClase = "bg-red-650";
        else if (rep.tipo === "Hurto") colorClase = "bg-[#ff5d00]";
        else if (rep.tipo === "Amenazas y peleas") colorClase = "bg-yellow-500";

        const el = document.createElement("div");
        el.className = `w-6 h-6 rounded-full ${colorClase} border-2 border-white flex items-center justify-center shadow cursor-pointer`;
        el.style.width = "26px";
        el.style.height = "26px";
        el.innerHTML =
            '<span class="w-1.5 h-1.5 bg-white rounded-full"></span>';

        const popupHtml = `
            <div class="p-1 font-sans rounded text-zinc-900" style="min-width: 190px;">
                <div class="flex items-center justify-between border-b border-zinc-150 pb-1.5 mb-1.5">
                    <span class="font-bold text-xs uppercase text-[#ff5d00]">${rep.tipo}</span>
                    ${rep.gravedad ? `<span class="text-[9px] bg-zinc-100 text-zinc-650 px-2 py-0.5 rounded font-mono font-bold">${rep.gravedad}</span>` : ""}
                </div>
                <p class="text-xs text-zinc-700 leading-tight mb-2 font-medium">${rep.descripcion}</p>
                <div class="text-[9px] text-zinc-400 font-mono space-y-0.5">
                    <div>Dir: ${rep.ubicacion} ${rep.barrio ? `(B. ${rep.barrio})` : ""}</div>
                    <div class="font-bold text-zinc-500">${rep.fecha instanceof Date ? formatearFechaHumana(rep.fecha) : (rep.fecha || "")}</div>
                </div>
            </div>
        `;

        mapMarkers.push(createReportMarker(map, [rep.lng, rep.lat], el, popupHtml));
    });
}
