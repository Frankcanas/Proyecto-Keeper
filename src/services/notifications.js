import fastApi from './api/fastApi';

const GetAllNotifications = fastApi.getAll('/notificaciones/');

const createNotification = fastApi.postData('/notificaciones/', notificationData);

const tickNotification = fastApi.putData(`/notificaciones/${id}/leida`);