import fastApi from '../utils/fastApi';

const GetAllRoles = fastApi.getAll('/roles/');

const GetRoleById = (id) => {fastApi.getById(`/roles/${id}`);}

const CreateRole = (roleData) => {fastApi.postData('/roles/', roleData);}

const UpdateRole = (id, roleData) => {fastApi.putData(`/roles/${id}`, roleData);}

const DeleteRole = (id) =>  {fastApi.deleteData(`/roles/${id}`);}