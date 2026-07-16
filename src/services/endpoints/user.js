import fastApi from './api/fastApi';

const GetAllUsers = fastApi.getAll('/usuarios/');

const GetUserById = (id) => {fastApi.getById(`/usuarios/${id}`);}

const CreateUser = (userData) => {fastApi.postData('/usuarios/', userData);}

const UpdateUser = (id, userData) => {fastApi.putData(`/usuarios/${id}`, userData);}

const DeleteUser = (id) => {fastApi.deleteData(`/usuarios/${id}`);}