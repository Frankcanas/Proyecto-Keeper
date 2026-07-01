import { get_location, localtionDefault } from "../models/locationModel";
import { renderMap, pointer, updateMapPosition } from "../views/mapView";

let currentMap = null;
let currentMarker = null;
let watchId = null;

export async function initMap() {
    let initialCoords;
    try {
        const gps = await get_gps_location();
        initialCoords = [gps.lon, gps.lat];
    } catch (gpsError) {
        try {
            const ip = await get_location();
            initialCoords = [ip.lon, ip.lat];
        } catch (ipError) {
            initialCoords = localtionDefault;
        }
    }

    currentMap = renderMap(initialCoords);
    currentMarker = pointer(currentMap, initialCoords);
}


export function startRealTimeTracking() {
    if (!navigator.geolocation) return;

    if (watchId) navigator.geolocation.clearWatch(watchId); 

    watchId = navigator.geolocation.watchPosition(
        (position) => {
            const newCoords = [position.coords.longitude, position.coords.latitude];
            console.log("Ubicación actual:", newCoords);

            if (currentMap && currentMarker) {
                updateMapPosition(currentMap, currentMarker, newCoords);
            }
        },
        (error) => {
            console.error("Error leyendo el movimiento en tiempo real:", error.message);
        },
        {
            enableHighAccuracy: true, 
            maximumAge: 0,            
            timeout: 10000
        }
    );
}