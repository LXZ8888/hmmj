import request from '@/utils/request'

// 封装一个用于登录的接口
export const loginAPI = data => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

// 获取用户信息的接口,下面这种是简写请求
export const userInfoAPI = () => {
  return request.get('/auth/currentUser')
}
