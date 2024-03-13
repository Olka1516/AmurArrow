import axios from 'axios'

export const axiosFileInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'multipart/form-data' }
})
