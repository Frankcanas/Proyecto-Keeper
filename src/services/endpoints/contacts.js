import fastApi from './api/fastApi';

const GetAllContacts = fastApi.getAll('/contactos/');

const GetContactById = (id) => { fastApi.getById(`/contactos/${id}`); }

const CreateContact = (contactData) => { fastApi.postData('/contactos/', contactData); }

const UpdateContact = (id, contactData) => { fastApi.putData(`/contactos/${id}`, contactData); }

const DeleteContact = (id) => { fastApi.deleteData(`/contactos/${id}`); }