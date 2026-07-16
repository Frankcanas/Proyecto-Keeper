import fastApi from './api/fastApi';

const GetAllReports = fastApi.getAll('/reportes/');

const GetReportById = fastApi.getById(`/reportes/${id}`);

const CreateReport = fastApi.postData('/reportes/', reportData);

const UpdateReport = fastApi.putData(`/reportes/${id}`, reportData);

const DeleteReport = fastApi.deleteData(`/reportes/${id}`);