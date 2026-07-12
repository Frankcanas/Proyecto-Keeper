import { createApiClient, createCrudService } from "../api/apiManager.js";
import { moveToSearchedLocation } from "../controllers/mapManager.controller.js";
import Swal from "sweetalert2";

const apiClient = createApiClient("https://nominatim.openstreetmap.org");
const nominatimService = createCrudService(apiClient);

export function findAddress(htmlObject) {
    htmlObject?.addEventListener("keypress", async(e) => {
        if (e.key === "Enter") {
            const query = e.target.value.trim();
            if (!query) return;
            try {
                // 2. Usamos tu método getAll de Axios pasándole los params
                const data = await nominatimService.getAll("/search", {
                    format: "json",
                    q: query,
                });

                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    const shortName = data[0].display_name.split(",")[0];

                    // 3. Alerta de éxito con SweetAlert2
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: `Ubicación: ${shortName}`,
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: {
                            popup: "rounded border border-zinc-200 bg-white font-sans text-xs",
                        },
                    });

                    // 4. Volamos a las coordenadas con tu controlador de MapLibre
                    moveToSearchedLocation(lon, lat);
                } else {
                    // No se encontró la dirección
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: "No se encontró la dirección",
                        showConfirmButton: false,
                        timer: 2000,
                        customClass: {
                            popup: "rounded border border-zinc-200 bg-white font-sans text-xs",
                        },
                    });
                }
            } catch (err) {
                console.error("Error buscando dirección en Nominatim:", err);
                // Alerta opcional por si se cae el internet o falla Axios
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: "Error de conexión",
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: {
                        popup: "rounded border border-zinc-200 bg-white font-sans text-xs",
                    },
                });
            }
        }
    });
}
