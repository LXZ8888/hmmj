import axios from 'axios'
import { Message } from 'element-ui'
// 请求拦截器/按需导入方法
import { getToken } from '@/utils/storage.js'
import router from '@/router'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/',
  timeout: 5000
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    if (getToken()) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 在发送请求之前做些什么
    return response.data
  },
  function (error) {
    console.dir(error.response.data.message)
    if (error.response.status === 401) {
      Message.warning('登录状态失效，请重新登录')
      router.push('/login')
      store.commit('user/logout')
    } else {
      Message.error(error.response.data.message)

      // 对请求错误做些什么
      return Promise.reject(error)
    }
  }
)
// 暴露出去
export default request
