import { fastApi } from "../api/fastApi";

api = fastApi;

export const ReporteService = {
    obtenerTodos: async () => {
        const response = await api.get('/reportes');
        return response.data;
    },

    crear: async (datosReporte) => {
        const response = await api.post('/reportes/', datosReporte);
        return response.data;
    },

    obtenerPorId: async (id_reporte) => {
        const response = await api.get(`/reportes/${id_reporte}`);
        return response.data;
    },

    actualizar: async (id_reporte, datosActualizados) => {
        const response = await api.put(`/reportes/${id_reporte}`, datosActualizados);
        return response.data;
    },

    eliminar: async (id_reporte) => {
        const response = await api.delete(`/reportes/${id_reporte}`);
        return response.data;
    }
}