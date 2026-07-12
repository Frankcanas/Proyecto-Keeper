import axios from "axios";

export const createApiClient = (url) => axios.create({
    baseURL: url,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
});


export async function apiRequest(httpClient, method = "get", url = "", information = null) {
    try {
        const normalizedMethod = method.toLowerCase();
        const response =
            normalizedMethod === "get" || normalizedMethod === "delete"
                ? await httpClient[normalizedMethod](`/${url}`)
                : await httpClient[normalizedMethod](`/${url}`, information);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(
            `Error en la petición ${method.toUpperCase()} a /${url}:`,
            error,
        );
        throw error;
    }
}
