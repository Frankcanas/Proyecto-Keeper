import fastApi from './api/fastApi';

const GetEvidence = (id) => { fastApi.getAll(`/evidencias/${id}`); }

const GetEvidenceById = (id) => { fastApi.getById(`/evidencias/reporte/${id}`); }

const CreateEvidence = (evidenceData) => { fastApi.postData('/evidencias/', evidenceData); }

const DeleteEvidence = (id) => { fastApi.deleteData(`/evidencias/${id}`); }