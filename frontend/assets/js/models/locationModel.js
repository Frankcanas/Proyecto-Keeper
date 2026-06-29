import axios from "axios";

export const localtionDefault = [-74.781, 10.968];

export async function get_location() {
    try {
        const location = currentLocation();
        const response = await location.get();
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const currentLocation = () => {
    try {
        const ip_location = axios.create({
            baseURL: "http://ip-api.com/json/",
            timeout: 5000,
            headers: { "Content-Type": "application/json" },
        });
        return ip_location;
    } catch (error) {
        console.error("error found: " + error);
        return localtionDefault;
    }
};