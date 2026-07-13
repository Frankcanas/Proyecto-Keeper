import { Map, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const renderMap = (location, containerId = "map") => {
    const map = new Map({
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: location,
        zoom: 16,
        container: containerId,
    });
    return map;
};

export const pointer = (map, location) => {
    return new Marker()
    .setLngLat(location)
    .addTo(map);
};

export const pointerTarget = (map, location) => {
    return new Marker({ color: "#ef4444" }) 
    .setLngLat(location)
    .addTo(map);
};

export const updateMapPosition = (map, marker, location) => {
    marker.setLngLat(location);
    map.flyTo({ center: location, speed: 1.2 });
};

export const destroyMapInstance = (map, marker) => {
    if (marker) marker.remove(); 
    if (map) map.remove();       
};