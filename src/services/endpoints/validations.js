import fastApi from './api/fastApi';

const ValidationReportData = (reportData) => {fastApi.postData('/validaciones/', reportData);}

const GetValidation = (id) => {fastApi.getById(`/validaciones/reporte/${id}`);}