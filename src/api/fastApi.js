import { createApiClient, createCrudService } from "./client";

// Exporta la instancia del cliente de la API y el servicio CRUD para FastAPI
const api = createApiClient("http://127.0.0.1:8000");
export const fastApi = createCrudService(api);

export const getAllAlerts = async() => fastApi.getAll("/alertas/")

objeto = {report_name: "juan"}