import fastApi from './api/fastApi';

const ConfirmReport = (reportData) => { fastApi.postData('/confirmaciones/', reportData); }

const GetConfirmation = (id) => { fastApi.getById(`/confirmaciones/reporte/${id}`); }