import fastApi from './api/fastApi';

const ConfirmReport = fastApi.postData('/confirmaciones/', reportData);

const GetConfirmation = fastApi.getById(`/confirmaciones/reporte/${id}`);