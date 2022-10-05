import request from '@/utils/request'
/** 合作商搜索
 *
 * @param {*} datapageIndex	否		当前页码
pageSize	否		每页数据个数
name	否		区域名称
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
 * 重置密码
 * @param {*} id
 * @returns
 */
export function getpasswordAPI(id) {
  return request({
    url: `/api/user-service/partner/resetPwd/${id}`,
    method: 'put'
  })
}
/**
 * 删除合作商
 * @param {*} id
 * @returns
 */
export function deletePartnersAPI(id) {
  return request({
    url: `/api/user-service/partner/${id}`,
    method: 'delete'
  })
}
/**
 *新增合作商
 * @param {*} data
 * @returns
 */
export function postPartnersAPI(data) {
  return request({
    url: '/api/user-service/partner',
    method: 'post',
    data
  })
}

export function TheEditorPartnersAPI(id, data) {
  return request({
    url: `/api/user-service/partner/${id}`,
    method: 'put',
    data
  })
}

