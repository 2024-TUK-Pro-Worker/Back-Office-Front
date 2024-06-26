import axios from "axios";

const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true
})

axiosApi.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401){
        window.location.href = '/logout'
      }
      return Promise.reject(error);
    }
  );

export default axiosApi;