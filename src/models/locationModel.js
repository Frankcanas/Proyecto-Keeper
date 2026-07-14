export const locationDefault = [-74.781, 10.968];

export const geolocator =
    typeof navigator !== "undefined"
        ? navigator.geolocation
        : null;

const GEO_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 90000,
};

export function get_location() {
    if (!geolocator) {
        return Promise.reject(
            new Error("La geolocalización no está soportada por este navegador.")
        );
    }

    return new Promise((resolve, reject) => {
        geolocator.getCurrentPosition(
            ({ coords }) => {
                resolve({
                    lon: coords.longitude,
                    lat: coords.latitude,
                });
            },
            reject,
            GEO_OPTIONS
        );
    });
}