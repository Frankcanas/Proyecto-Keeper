import { initMap, initPointer } from "./assets/js/controllers/mapManager.controller";
import { callFastAPI } from "./assets/js/models/fastapiModel";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await initMap();
        initPointer();
        
    } catch (error) {
        console.error("Error crítico durante la inicialización de la app:", error);
    }
});
