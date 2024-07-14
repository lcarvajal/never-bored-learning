import axios from 'axios';

function setTokenForAxiosRequests(token: string) {
  axios.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  }, (error) => {
    return Promise.reject(error)
  })
}

export default function configureAxios(baseURL: string, token: string) {
  axios.defaults.baseURL = baseURL;
  setTokenForAxiosRequests(token);
}