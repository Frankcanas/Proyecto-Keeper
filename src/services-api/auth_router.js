import { fastApi } from '../api/fastApi';

api = fastApi;

export const AuthService = {
    // Iniciar sesión (POST /auth/login)
    login: async (credenciales) => {
        const response = await api.post('/auth/login', credenciales);
        return response.data;
    },

    registro: async (datosUsuario) => {
        const response = await api.post('/auth/registro', datosUsuario);
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    }
};