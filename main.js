import { initMap, startRealTimeTracking } from "./js/controllers/mapManager.controller";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await initMap();
        startRealTimeTracking();
    } catch (error) {
        console.error("Error crítico durante la inicialización de la app:", error);
    }
});
