import { fastApi } from '../api/fastApi';

api = fastApi;

export const UsuarioService = {

    // Obtener todos los usuarios (solo para administradores)
    obtenerTodos: async () => {
        const response = await api.get('/usuarios');
        return response.data;
    },

    // Crear un nuevo usuario (POST /usuarios/)
    // El objeto 'datosUsuario' debe tener esta estructura basada en la API:
    // {
    //   "id_rol": 0,
    //   "nombres": "string",
    //   "apellidos": "string",
    //   "fecha_nacimiento": "YYYY-MM-DD",
    //   "cedula": "string",
    //   "correo": "user@example.com",
    //   "telefono": "string",
    //   "password_hash": "string",
    //   "foto_perfil": "string"
    // }
    crear: async (datosUsuario) => {
        const response = await api.post('/usuarios/', datosUsuario);
        return response.data;
    },

    // Obtener un usuario específico por su ID
    obtenerPorId: async (id_usuario) => {
        const response = await api.get(`/usuarios/${id_usuario}`);
        return response.data;
    },

    // Actualizar datos del usuario
    actualizar: async (id_usuario, datosActualizados) => {
        const response = await api.put(`/usuarios/${id_usuario}`, datosActualizados);
        return response.data;
    },

    // Eliminar un usuario (Baja del sistema)
    eliminar: async (id_usuario) => {
        const response = await api.delete(`/usuarios/${id_usuario}`);
        return response.data;
    }
};