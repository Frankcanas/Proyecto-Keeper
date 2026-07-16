import { fastApi } from '../../api/fastApi';

export const getEvidence = (id) => fastApi.getById('/evidencias', id);

export const getEvidenceById = (id) => fastApi.getById('/evidencias/reporte', id);

export const createEvidence = (evidenceData) => fastApi.postData('/evidencias/', evidenceData);

export const deleteEvidence = (id) => fastApi.deleteData('/evidencias', id);
