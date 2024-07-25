import axios from "axios";

const getToken = () => {
    return localStorage.getItem('token')
}

export const instance = axios.create({
    //creating axios instance to make requests to server
    baseURL: 'http://localhost:2020',
    headers: {
        'Content-Type': 'application/json',
    }
  });


  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    })