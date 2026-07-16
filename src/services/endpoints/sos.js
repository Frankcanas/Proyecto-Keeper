import fastApi from './api/fastApi';

const GetAllSos = fastApi.getAll('/sos/');

const CreateSos = (sosData) => {fastApi.postData('/sos/', sosData);}

const UpdateSos = (id, sosData) => {fastApi.putData(`/sos/${id}`, sosData);}