import {
    get_location,
    locationDefault,
    geolocator,
} from "../models/locationModel.js";
import {
    renderMap,
    pointer,
    updateMapPosition,
    destroyMapInstance,
    pointerTarget,
} from "../components/mapDiv";

let currentMap = null;
let currentMarker = null;
let watchId = null;
let targetMarker = null;

//Inicializa el mapa con la ubicación actual del usuario o una ubicación predeterminada
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
    currentMap.doubleClickZoom.disable();

    currentMap.on("dblclick", (e) => {
        const lon = e.lngLat.lng;
        const lat = e.lngLat.lat;
        //Reutilizamos la función moveToSearchedLocation para mover el mapa y colocar un marcador rojo.
        moveToSearchedLocation(lon, lat);
    });
}

// Actualiza la posición del marcador y centra el mapa en la nueva ubicación
export function startRealTimeTracking() {
    if (!geolocator) return;

    if (watchId) geolocator.clearWatch(watchId);

    watchId = geolocator.watchPosition(
        (position) => {
            const newCoords = [
                position.coords.longitude,
                position.coords.latitude,
            ];

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

// Detiene el seguimiento en tiempo real y limpia los recursos del mapa
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

// Mueve el mapa a la ubicación buscada y coloca un marcador rojo en esa posición
export function moveToSearchedLocation(lon, lat) {
    if (!currentMap) {
        console.warn("El mapa aún no está listo para moverse.");
        return;
    }
    const newCoords = [lon, lat];
    if (targetMarker) {
        updateMapPosition(currentMap, targetMarker, newCoords);
    } else {
        targetMarker = pointerTarget(currentMap, newCoords);
        currentMap.flyTo({ center: newCoords, speed: 1.2 });
    }
}
