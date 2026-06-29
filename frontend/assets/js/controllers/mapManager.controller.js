import { get_location, localtionDefault } from "../models/locationModel";
import { renderMap } from "../views/mapView";

export async function initApp() {
    const coords = await get_location();
    try {
        renderMap([coords.lon, coords.lat]);
    } catch (error) {
        console.error(error);
        renderMap(localtionDefault);
    }
}
