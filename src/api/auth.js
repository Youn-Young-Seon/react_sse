import api from "./api";

export const login = (id, password) => api.post(`/api/login`, { id, password });

export const info = () => api.get(`/api/auth`);

export const send = (messageData) => api.post(`/api/add`, messageData);