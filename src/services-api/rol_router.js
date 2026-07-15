import { fastApi } from '../api/fastApi';

api = fastApi;

export const RolService = {

    // Obtener todos los roles (solo para administradores)
    obtenerTodos: async () => {
        const response = await api.get('/roles');
        return response.data;
    },

    crear: async (datosRol) => {
        const response = await api.post('/roles/', datosRol);
        return response.data;
    },

    obtenerPorId: async (id_rol) => {
        const response = await api.get(`/roles/${id_rol}`);
        return response.data;
    },

    actualizar: async (id_rol, datosActualizados) => {
        const response = await api.put(`/roles/${id_rol}`, datosActualizados);
        return response.data;
    },

    eliminar: async (id_rol) => {
        const response = await api.delete(`/roles/${id_rol}`);
        return response.data;
    }

}