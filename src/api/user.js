import request from '@/utils/request'

export function getInfo(userId) {
  return request({
    url: `/api/user-service/user/${userId}`,
    method: 'GET'
  })
}

