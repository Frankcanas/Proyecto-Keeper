import {
    get_location,
    localtionDefault,
    geolocator,
} from '../services/locationModel';
import { renderMap, pointer, updateMapPosition } from "../components/mapDiv";

let currentMap = null;
let currentMarker = null;
let watchId = null;

export async function initMap() {
    let initialCoords;
    try {
        const coords = await get_location();
        initialCoords = [coords.lon, coords.lat];
    } catch (Error) {
        console.error(Error);
        initialCoords = localtionDefault;
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
            maximumAge: 0,
            timeout: 10000,
        },
    );
}
