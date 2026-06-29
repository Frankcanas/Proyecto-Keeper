import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const renderMap = (location) => new Map({
    style: "https://tiles.openfreemap.org/styles/liberty",
    center: location,
    zoom: 12,
    container: "map",
});

