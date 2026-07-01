import axios from "axios";

export async function callFastAPI() {
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
});
