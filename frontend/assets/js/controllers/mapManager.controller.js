import { get_location, localtionDefault } from "../models/locationModel";
import { renderMap, pointer } from "../views/mapView";

export async function initMap() {
    const coords = await get_location();
    try {
        renderMap([coords.lon, coords.lat]);
    } catch (error) {
        console.error(error);
        renderMap(localtionDefault);
    }
}

export async function initPointer() {
    try {
        const coords = await get_location();
        const map = renderMap([coords.lon, coords.lat]);
        pointer(map, [coords.lon, coords.lat]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
