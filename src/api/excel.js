import request from '@/utils/request'

export function upload_competition_excel(data) {
    return request({
      url: '/api/excel/competition',
      method: 'post',
      data
    })
}

