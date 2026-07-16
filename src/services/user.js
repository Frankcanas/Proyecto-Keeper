import fastApi from './api/fastApi';

const GetAllUsers = fastApi.getAll('/usuarios/');

const GetUserById = fastApi.getById(`/usuarios/${id}`);

const CreateUser = fastApi.postData('/usuarios/', userData);

const UpdateUser = fastApi.putData(`/usuarios/${id}`, userData);

const DeleteUser = fastApi.deleteData(`/usuarios/${id}`);