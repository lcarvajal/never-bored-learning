import axios from 'axios';

export function setRequestToken(token: string) {
  axios.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${token}`
    console.log("config", config)
    return config
  }, (error) => {
    return Promise.reject(error)
  })
}

export function setRequestBaseURL(baseURL: string) {
  axios.defaults.baseURL = baseURL;
}