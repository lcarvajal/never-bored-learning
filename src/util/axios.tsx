import axios from 'axios';

export function configureAxios() {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  axios.defaults.headers.common['Content-Type'] = "application/json";

  if (import.meta.env.DEV) {
    axios.defaults.headers.common['x-vercel-protection-bypass'] = import.meta.env.VITE_SERVER_PREVIEW_SECRET_KEY;
    axios.defaults.headers.common['x-vercel-set-bypass-cookie'] = "true";
  }
}

export function setRequestToken(token: string) {
  axios.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${token}`
    console.log("config", config)
    return config
  }, (error) => {
    return Promise.reject(error)
  })
}
