import fastApi from './api/fastApi';

const GetAllContacts = fastApi.getAll('/contactos/');

const GetContactById = fastApi.getById(`/contactos/${id}`);

const CreateContact = fastApi.postData('/contactos/', contactData);

const UpdateContact = fastApi.putData(`/contactos/${id}`, contactData);

const DeleteContact = fastApi.deleteData(`/contactos/${id}`);