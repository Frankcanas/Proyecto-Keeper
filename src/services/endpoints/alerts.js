import fastApi from './api/fastApi';

const GetAllAlerts = fastApi.getAll('/alertas/');

const GetAlertById =  (id) => { return  fastApi.getById(`/alertas/${id}`); }

const CreateAlert =  (alertData) => { return  fastApi.postData('/alertas/', alertData); }