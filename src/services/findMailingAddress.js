import { createApiClient, createCrudService } from "../api/apiManager.js";

const apiClient = createApiClient("https://nominatim.openstreetmap.org");
const nominatimService = createCrudService(apiClient);

const NOMINATIM_EMAIL = "luis@gmail.com";

/**
 * Caché en memoria para evitar peticiones repetidas.
 */
const addressCache = new Map();

/**
 * Genera una clave basada en las coordenadas.
 */
const createCacheKey = (lat, lon) =>
    `${lat.toFixed(5)},${lon.toFixed(5)}`;

export async function findMailingAddress(lat, lon) {
    const cacheKey = createCacheKey(lat, lon);

    if (addressCache.has(cacheKey)) {
        return addressCache.get(cacheKey);
    }

    try {
        const data = await nominatimService.getAll(
            "/reverse",
            {
                format: "json",
                lat,
                lon,
                email: NOMINATIM_EMAIL,
            },
            {
                headers: {
                    Authorization: undefined,
                    "X-Requested-With": undefined,
                    "Content-Type": undefined,
                },
            }
        );

        if (!data?.display_name) {
            return "Dirección no identificada";
        }

        const address = data.display_name
            .split(",")
            .slice(0, 3)
            .join(",")
            .trim();

        addressCache.set(cacheKey, address);

        return address;

    } catch (error) {
        console.error(
            "Error en Geocodificación Inversa con Axios:",
            error
        );

        return "Error al obtener dirección";
    }
}