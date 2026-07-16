import fastApi from './api/fastApi';

const ValidationReportData = fastApi.postData('/validaciones/', reportData);

const GetValidation = fastApi.getById(`/validaciones/reporte/${id}`);