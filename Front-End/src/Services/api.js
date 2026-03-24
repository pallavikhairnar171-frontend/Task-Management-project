import axios from "axios";


console.log(import.meta.env.VITE_API_BASE_URL);
 const api = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL
});

api.interceptors.request.use((config)=>{
    // const state = store.getState();
    const token = localStorage.getItem('token') 
     if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
     return config
}
, (error) => Promise.reject(error))
export default api