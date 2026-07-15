import { fastApi } from '../api/fastApi';

api = fastApi;

export const ServicioEmergenciaService = {

    // Obtener todos los servicios de emergencia
    obtenerTodos: async () => {
        const response = await api.get('/servicios-emergencia');
        return response.data;
    },

    crear: async (datosServicioEmergencia) => {
        const response = await api.post('/servicios-emergencia/', datosServicioEmergencia);
        return response.data;
    },

    obtenerPorId: async (id_servicio_emergencia) => {
        const response = await api.get(`/servicios-emergencia/${id_servicio_emergencia}`);
        return response.data;
    },

    actualizar: async (id_servicio_emergencia, datosActualizados) => {
        const response = await api.put(`/servicios-emergencia/${id_servicio_emergencia}`, datosActualizados);
        return response.data;
    },

    eliminar: async (id_servicio_emergencia) => {
        const response = await api.delete(`/servicios-emergencia/${id_servicio_emergencia}`);
        return response.data;
    }
}