import fastApi from './api/fastApi';

const GetAllAlerts = fastApi.getAll('/alertas/');

const GetAlertById = fastApi.getById(`/alertas/${id}`);

const CreateAlert = fastApi.postData('/alertas/', alertData);