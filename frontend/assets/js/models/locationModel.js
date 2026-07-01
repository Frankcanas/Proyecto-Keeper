import axios from "axios";

export const localtionDefault = [-74.781, 10.968];

const ip_location = axios.create({
    baseURL: "https://ipapi.co/json/",
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
});

export function get_location() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("La geolocalización no está soportada por este navegador."));
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lon: position.coords.longitude,
                    lat: position.coords.latitude
                });
            },
            (error) => reject(error),
            { enableHighAccuracy: true, timeout: 8000 }
        );
    });
}