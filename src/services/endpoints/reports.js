import fastApi from './api/fastApi';

const GetAllReports = fastApi.getAll('/reportes/');

const GetReportById = (id) => { fastApi.getById(`/reportes/${id}`); }

const CreateReport = (reportData) => { fastApi.postData('/reportes/', reportData); }

const UpdateReport = (id, reportData) => { fastApi.putData(`/reportes/${id}`, reportData); }

const DeleteReport = (id) => { fastApi.deleteData(`/reportes/${id}`); }