import fastApi from './api/fastApi';

const GetAllServices = fastApi.getAll('/servicios_emergencia/');

const GetServiceById = fastApi.getById(`/servicios_emergencia/${id}`);

const CreateService = fastApi.postData('/servicios_emergencia/', serviceData);

const UpdateService = fastApi.putData(`/servicios_emergencia/${id}`, serviceData);

const DeleteService = fastApi.deleteData(`/servicios_emergencia/${id}`);