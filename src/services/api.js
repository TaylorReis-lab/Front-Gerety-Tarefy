import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080'
})

export const GetAllTasks = () => api.get('/tasks')
export const CreateTask = (newTask) => api.post('/tasks', newTask)
export const UpdateTask = (id, task) => api.put(`/tasks/${id}`, task)
export const DeleteTask = (id) => api.delete(`/tasks/${id}`)