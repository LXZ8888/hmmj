import request from '@/utils/request'

// 封装一个用于登录的接口
export const loginAPI = data => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
