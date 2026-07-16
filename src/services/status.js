import fastApi from './api/fastApi';

const GetAllStatus = fastApi.getAll('/estados_reporte/');

const GetStatusById = fastApi.getById(`/estados_reporte/${id}`);

const CreateStatus = fastApi.postData('/estados_reporte/', statusData);

const UpdateStatus = fastApi.putData(`/estados_reporte/${id}`, statusData);

const DeleteStatus = fastApi.deleteData(`/estados_reporte/${id}`);