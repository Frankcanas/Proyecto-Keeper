import { get_location, localtionDefault } from "../models/locationModel";
import { renderMap, pointer } from "../views/mapView";

let currentMap = null;
let currentCoords = null;

export async function initMap() {
    try {
        const coords = await get_location();
        currentCoords = [coords.lon, coords.lat];
        currentMap = renderMap(currentCoords);
    } catch (error) {
        console.error(error);
        currentCoords = localtionDefault
        currentMap = renderMap(currentCoords);
    }
}

export async function initPointer() {
    const coords = currentCoords || localtionDefault;
    if (currentMap) {
        pointer(currentMap, coords);
    } else {
        console.error("[Controller Error] No puedes inicializar el puntero si el mapa no ha sido creado primero.");
    }
}
