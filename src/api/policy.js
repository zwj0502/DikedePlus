import request from '@/utils/request'
export const getpolicy = (params) => {
  return request({
    url: '/api/vm-service/policy/search',
    params
  })
}
export const addPolicy = (data) => {
  return request({
    url: '/api/vm-service/policy',
    method: 'POST',
    data
  })
}
