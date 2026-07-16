import fastApi from './api/fastApi';

const authenticateLogin = fastApi.postData('/auth/login/', loginData);

const authenticateRegister = fastApi.postData('/auth/register/', registerData);

const authenticateLogout = fastApi.postData('/auth/logout/');