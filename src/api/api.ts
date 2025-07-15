import axios from "axios";

const api = axios.create({
   baseURL:"https://blogit-be-1.onrender.com",
    withCredentials: true
});

// const api = axios.post('https://blogit-be-1.onrender.com/api/auth/register', data, {
//   withCredentials: true
// });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });


export default api;