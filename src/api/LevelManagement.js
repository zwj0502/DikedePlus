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
