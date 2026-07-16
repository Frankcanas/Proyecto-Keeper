import fastApi from './api/fastApi';

const authenticateLogin =  (loginData) => { fastApi.postData('/auth/login/', loginData); }

const authenticateRegister =  (registerData) => { fastApi.postData('/auth/register/', registerData); }

const authenticateLogout = fastApi.postData('/auth/logout/');