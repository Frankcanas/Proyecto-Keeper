import axios from "axios";

export async function callFastAPI() {
    try {
        const api = callApi();
        const response = await api.get("/");
        return response.data.message;
    } catch (error) {
        console.error(error)
        throw error
    }
}

const callApi = () => {
    const url = "http://127.0.0.1:8000";
    try {
        const response = axios.create({
            baseURL: url,
            timeout: 5000,
            headers: { "Content-Type": "application/json" },
        });
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
};
