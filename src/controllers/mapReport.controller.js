import { createReportMarker } from "../components/mapComponent/mapView.js";
import {
    createMarkerElement,
    createPopupHtml,
} from "../components/mapComponent/reportMarker.js";

const reportState = {
    markers: [],
};

/**
 * Filtra, limpia y renderiza nuevos marcadores
 */
export function updateReportMarkers(map, reports) {
    if (!map) {
        console.warn(
            "No puede renderizar marcadores. La instancia de mapa proporcionada es inválida o no está inicializada."
        );
        return;
    }

    clearReportMarkers();

    for (const report of reports) {
        if (typeof report.lat !== "number" || typeof report.lng !== "number") {
            continue;
        }

        const marker = createReportMarker(
            map,
            [report.lng, report.lat],
            createMarkerElement(report),
            createPopupHtml(report),
        );

        reportState.markers.push(marker);
    }
}

/**
 * Elimina todos los marcadores
 */
export function clearReportMarkers() {
    for (const marker of reportState.markers) {
        marker.remove();
    }

    reportState.markers.length = 0;
}
