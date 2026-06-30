import { Map, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const renderMap = (location) => {
    const map = new Map({
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: location,
        zoom: 12,
        container: "map",
    });
    return map;
};

export const pointer = (map, location) => {
    new Marker()
    .setLngLat(location)
    .addTo(map);
};
