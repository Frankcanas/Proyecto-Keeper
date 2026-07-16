import fastApi from './api/fastApi';

const GetAllZones = fastApi.getAll('/zonas/');

const GetZoneById = fastApi.getById(`/zonas/${id}`);

const CreateZone = fastApi.postData('/zonas/', zoneData);

const UpdateZone = fastApi.putData(`/zonas/${id}`, zoneData);

const DeleteZone = fastApi.deleteData(`/zonas/${id}`);