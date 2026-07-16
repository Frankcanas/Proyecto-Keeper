import fastApi from './api/fastApi';

const GetEvidence = fastApi.getAll(`/evidencias/${id}`);

const GetEvidenceById = fastApi.getById(`/evidencias/reporte/${id}`);

const CreateEvidence = fastApi.postData('/evidencias/', evidenceData);

const DeleteEvidence = fastApi.deleteData(`/evidencias/${id}`);