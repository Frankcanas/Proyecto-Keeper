import fastApi from './api/fastApi';

const GetAllStatus = fastApi.getAll('/estados_reporte/');

const GetStatusById = (id) => {fastApi.getById(`/estados_reporte/${id}`);}

const CreateStatus = (statusData) => {fastApi.postData('/estados_reporte/', statusData);}

const UpdateStatus = (id, statusData) => {fastApi.putData(`/estados_reporte/${id}`, statusData);}

const DeleteStatus = (id)  => {fastApi.deleteData(`/estados_reporte/${id}`);}