import axios from 'axios'
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/',
  timeout: 5000
})
// 请求拦截器
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 在发送请求之前做些什么
  return response.data
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 暴露出去
export default request
