export const localtionDefault = [-74.781, 10.968];

export const geolocator = navigator.geolocation

export function get_location() {
    return new Promise((resolve, reject) => {
        if (!geolocator) {
            reject(new Error("La geolocalización no está soportada por este navegador."));
        }
        geolocator.getCurrentPosition(
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