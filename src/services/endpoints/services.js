import fastApi from './api/fastApi';

const GetAllServices = fastApi.getAll('/servicios_emergencia/');

const GetServiceById = (id) => {fastApi.getById(`/servicios_emergencia/${id}`);}

const CreateService = (serviceData) => {fastApi.postData('/servicios_emergencia/', serviceData);}

const UpdateService = (id, serviceData) => {fastApi.putData(`/servicios_emergencia/${id}`, serviceData);}

const DeleteService = (id) => {fastApi.deleteData(`/servicios_emergencia/${id}`);}