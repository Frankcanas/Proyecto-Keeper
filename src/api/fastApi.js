import { createApiClient, createCrudService } from "./apiManager";


const api = createApiClient("http://127.0.0.1:8000");

export const fastApi = createCrudService(api);

