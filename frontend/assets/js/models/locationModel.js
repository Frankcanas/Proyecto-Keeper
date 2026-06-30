import axios from "axios";

export const localtionDefault = [-74.781, 10.968];

export async function get_location() {
    try {
        const response = await ip_location.get("/");
        return {
            lon: response.data.longitude,
            lat: response.data.latitude
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

const ip_location = axios.create({
    baseURL: "http://ipapi.co/json/",
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
});
