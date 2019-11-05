import request from '@/utils/request'

export function list(limit, offset) {
    return request({
      url: '/admin/honor/competition/list',
      method: 'get',
      params: {limit, offset}
})}

export function count() {
  return request({
      url: '/admin/honor/competition/count',
      method: 'get'
  })
}

export function search(data) {
  return request({
    url: '/admin/honor/competition/search',
    method: 'post',
    data
  })
}

export function countBykeyWord(keyword) {
  return request({
    url: '/admin/honor/competition/countBySearch',
    method: 'get',
    params: {keyword}
  })
}