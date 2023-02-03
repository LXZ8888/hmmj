import request from '@/utils/request'
// 封装一个获取面经列表的接口
export const articleListAPI = params => {
  return request({
    url: '/admin/interview/query',
    params
  })
}
