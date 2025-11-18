import api from './api';

const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const getTasks = (token, filter) => api.get('/tasks' + (filter ? `?filter=${filter}` : ''), authHeader(token));
export const createTask = (token, data) => api.post('/tasks', data, authHeader(token));
export const updateTask = (token, id, data) => api.put(`/tasks/${id}`, data, authHeader(token));
export const deleteTask = (token, id) => api.delete(`/tasks/${id}`, authHeader(token));
