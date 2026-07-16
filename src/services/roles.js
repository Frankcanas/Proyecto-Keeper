import fastApi from '../utils/fastApi';

const GetAllRoles = fastApi.getAll('/roles/');

const GetRoleById = fastApi.getById(`/roles/${id}`);

const CreateRole = fastApi.postData('/roles/', roleData);

const UpdateRole = fastApi.putData(`/roles/${id}`, roleData);

const DeleteRole = fastApi.deleteData(`/roles/${id}`);