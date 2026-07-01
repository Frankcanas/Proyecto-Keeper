import { initMap, startRealTimeTracking } from "./assets/js/controllers/mapManager.controller";
import { callFastAPI } from "./assets/js/models/fastapiModel";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await initMap();
        startRealTimeTracking();
        const mensajeBackend = await callFastAPI();
        console.log(mensajeBackend)
    } catch (error) {
        console.error("Error crítico durante la inicialización de la app:", error);
    }
});
