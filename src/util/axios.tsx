import axios from 'axios';

let requestToken = '' ;

export const setRequestToken = (token: string) => {
  requestToken = token;
}

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.headers.common['Content-Type'] = "application/json";

if (import.meta.env.DEV) {
  axios.defaults.headers.common['x-vercel-protection-bypass'] = import.meta.env.VITE_SERVER_PREVIEW_SECRET_KEY;
  axios.defaults.headers.common['x-vercel-set-bypass-cookie'] = "true";
}

axios.interceptors.request.use(async config => {
  console.log("Requesting: ", config.url)
  console.log("config", config)
  config.headers.Authorization = `Bearer ${requestToken}`
  return config
}, (error) => {
  return Promise.reject(error)
})
