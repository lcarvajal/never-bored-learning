import axios from 'axios';

export function setTokenForAxiosRequests(token: Promise<string>) {
  axios.interceptors.request.use(async config => {
    config.headers.token = token
    return config
  }, (error) => {
    return Promise.reject(error)
  })
}
