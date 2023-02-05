import request from '@/utils/request'
// 封装一个获取面经列表的接口
export const articleListAPI = params => {
  return request({
    url: '/admin/interview/query',
    params
  })
}
// 封装一个添加面经的接口
export const addArticleAPI = data => {
  return request({
    url: '/admin/interview/create',
    method: 'post',
    data
  })
}

// 封装一个删除面经的接口
export const delArticleAPI = data => {
  return request({
    url: '/admin/interview/remove',
    method: 'delete',
    data
  })
}
// 封装一个获取面经详情的接口
export const detailAPI = params => {
  return request({
    url: '/admin/interview/show',
    method: 'get',
    params
  })
}
// 封装一个修改面经详情的接口
export const updateAPI = data => {
  return request({
    url: '/admin/interview/update',
    method: 'put',
    data
  })
}
