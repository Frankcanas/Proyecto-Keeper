/**
 * Colores por tipo de reporte
 */
const MARKER_COLORS = {
    Robo: "bg-red-650",
    Hurto: "bg-[#ff5d00]",
    "Amenazas y peleas": "bg-yellow-500",
};

/**
 * Crea el elemento visual del marcador
 */
export const createMarkerElement = (report) => {
    const el = document.createElement("div");

    el.className = `
        w-6 h-6
        rounded-full
        border-2 border-white
        flex
        items-center
        justify-center
        shadow
        cursor-pointer
        ${MARKER_COLORS[report.tipo] ?? "bg-blue-500"}
    `;

    el.style.width = "26px";
    el.style.height = "26px";

    el.innerHTML =
        '<span class="w-1.5 h-1.5 bg-white rounded-full"></span>';

    return el;
};

/**
 * HTML del popup
 */
export const createPopupHtml = (report) => `
<div class="p-1 font-sans rounded text-zinc-900" style="min-width:190px;">
    <div class="flex items-center justify-between border-b border-zinc-150 pb-1.5 mb-1.5">
        <span class="font-bold text-xs uppercase text-[#ff5d00]">${report.tipo}</span>
        <span class="text-[9px] bg-zinc-100 text-zinc-650 px-2 py-0.5 rounded font-mono font-bold">${report.gravedad}</span></div>
    <p class="text-xs text-zinc-700 leading-tight mb-2 font-medium">${report.descripcion}</p>
    <div class="text-[9px] text-zinc-400 font-mono space-y-0.5">
        <div>Dir: ${report.ubicacion} (B. ${report.barrio})</div>
        <div class="font-bold text-zinc-500">${report.fecha}</div>
    </div>
</div>
`;