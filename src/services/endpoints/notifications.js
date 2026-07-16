import fastApi from './api/fastApi';

const GetAllNotifications = fastApi.getAll('/notificaciones/');

const createNotification = (notificationData) => { fastApi.postData('/notificaciones/', notificationData); }

const tickNotification = (id) => { fastApi.putData(`/notificaciones/${id}/leida`); }