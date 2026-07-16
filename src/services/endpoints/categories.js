import fastApi from './api/fastApi';

const GetAllCategories = fastApi.getAll('/categorias/');

const GetCategoryById = (id) => { fastApi.getById(`/categorias/${id}`); }

const CreateCategory = (categoryData) => { fastApi.postData('/categorias/', categoryData); }

const UpdateCategory = (id, categoryData) => { fastApi.putData(`/categorias/${id}`, categoryData); }

const DeleteCategory = (id) => { fastApi.deleteData(`/categorias/${id}`); }