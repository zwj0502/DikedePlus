import request from '@/utils/request'
/** 区域管理
 *
 * @param {*} datapageIndex	否		当前页码
pageSize	否		每页数据个数
name	否		区域名称
 * @returns
 */
export function getLevelManagementAPI(params) {
  return request({
    url: '/api/vm-service/region/search',
    method: 'get',
    params
  })
}
/**
 * 新增区域
 * @param {*} data regionName	string	必须		区域名称
remark	string	必须		备注
 * @returns
 */
export function postLevelManagementAPI(data) {
  return request({
    url: '/api/vm-service/region',
    method: 'post',
    data
  })
}
/**
 * 查看区域详情
 * @param {*} id 区域id

 * @returns
 */
export function getRegionaldetailsAPI(params) {
  return request({
    url: '/api/vm-service/node/search',
    method: 'get',
    params
  })
}
/**
 * 删除区域
 * @param {*} id 区域id
 * @returns
 */
export function deleteRegionaldetailsAPI(id) {
  return request({
    url: `/api/vm-service/region/${id}`,
    method: 'delete'
  })
}
/**
 * 删除区域
 * @param {*} id 区域id
 * @returns
 */
export function TheEditorRegionaldetailsAPI(id, data) {
  return request({
    url: `/api/vm-service/region/${id}`,
    method: 'put',
    data
  })
}

