import request from '@/utils/request'

export function list(limit, offset) {
    return request({
      url: '/admin/honor/competition/list',
      method: 'get',
      params: {limit, offset}
})}