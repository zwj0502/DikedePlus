import request from '@/utils/request'
/**
 * 获取点位
 * @param {*} params
 * @returns
 */
export function getPointsearchAPI(params) {
  return request({
    url: '/api/vm-service/node/search',
    method: 'get',
    params
  })
}
/**
 * 删除点位
 * @param {*} id
 * @returns
 */
export function deletePointsearchAPI(id) {
  return request({
    url: `/api/vm-service/node/${id}`,
    method: 'delete'

  })
}
/**
 * 搜索合作商
 * @param {*} params
 * @returns
 */
export function getpartnersAPI(params) {
  return request({
    url: '/api/user-service/partner/search',
    method: 'get',
    params
  })
}
