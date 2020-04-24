import axios from 'axios'
import store from '@/store'
import JSONbigint from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONbigint.parse(data)
  } catch (err) {
    return data
  }
}]
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, function (err) {
  return Promise.reject(err)
})
axios.interceptors.response.use(function (res) {
  return res
}, (err) => {
  if (err.response.status === 401) { location.hash = '#/login' }
  return Promise.reject(err)
})
export default axios
