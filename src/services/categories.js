import fastApi from './api/fastApi';

const GetAllCategories = fastApi.getAll('/categorias/');

const GetCategoryById = fastApi.getById(`/categorias/${id}`);

const CreateCategory = fastApi.postData('/categorias/', categoryData);

const UpdateCategory = fastApi.putData(`/categorias/${id}`, categoryData);

const DeleteCategory = fastApi.deleteData(`/categorias/${id}`);