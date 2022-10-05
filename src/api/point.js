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

/**
 * 新增点位
 * @param {*} params
 * @returns
 */
export function postpointAPI(data) {
  return request({
    url: '/api/vm-service/node',
    method: 'post',
    data
  })
}
/**
 * 修改点位
 * @param {*} params
 * @returns
 */
export function putpointAPI(id, data) {
  return request({
    url: `/api/vm-service/node/${id}`,
    method: 'put',
    data
  })
}

/**
 * 点位详情
 * @param {*} params
 * @returns
 */
export function getdetailsAPI(id) {
  return request({
    url: `/api/vm-service/node/vmList/${id}`,
    method: 'get'
  })
}
