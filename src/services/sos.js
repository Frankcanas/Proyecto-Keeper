import fastApi from './api/fastApi';

const GetAllSos = fastApi.getAll('/sos/');

const CreateSos = fastApi.postData('/sos/', sosData);

const UpdateSos = fastApi.putData(`/sos/${id}`, sosData);