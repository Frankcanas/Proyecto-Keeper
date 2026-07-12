import {
    get_location,
    locationDefault,
    geolocator,
} from '../services/locationService.js';
import { renderMap, pointer, updateMapPosition, destroyMapInstance } from "../components/mapDiv";

let currentMap = null;
let currentMarker = null;
let watchId = null;

export async function initMap() {
    let initialCoords;
    try {
        const coords = await get_location();
        initialCoords = [coords.lon, coords.lat];
    } catch (error) {
        console.error(error);
        initialCoords = locationDefault;
    }
    currentMap = renderMap(initialCoords);
    currentMarker = pointer(currentMap, initialCoords);
}

export function startRealTimeTracking() {
    if (!geolocator) return;

    if (watchId) geolocator.clearWatch(watchId);

    watchId = geolocator.watchPosition(
        (position) => {
            const newCoords = [
                position.coords.longitude,
                position.coords.latitude,
            ];
            console.log("Ubicación actual:", newCoords);

            if (currentMap && currentMarker) {
                updateMapPosition(currentMap, currentMarker, newCoords);
            }
        },
        (error) => {
            console.error(
                "Error leyendo el movimiento en tiempo real:",
                error.message,
            );
        },
        {
            enableHighAccuracy: true,
            maximumAge: 5000,
            timeout: 10000,
        },
    );
}

export function cleanupMap() {
    if (watchId !== null && geolocator) {
        geolocator.clearWatch(watchId);
        watchId = null;
    }
    destroyMapInstance(currentMap, currentMarker);
    currentMap = null;
    currentMarker = null;
    console.log("Sistema de mapas y GPS apagado y limpiado completamente.");
}