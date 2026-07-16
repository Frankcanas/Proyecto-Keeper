import fastApi from './api/fastApi';

const GetAllZones = fastApi.getAll('/zonas/');

const GetZoneById = (id) => {fastApi.getById(`/zonas/${id}`);}

const CreateZone = (zoneData) => {fastApi.postData('/zonas/', zoneData);}

const UpdateZone = (id, zoneData) => {fastApi.putData(`/zonas/${id}`, zoneData);}

const DeleteZone = (id) => {fastApi.deleteData(`/zonas/${id}`);}