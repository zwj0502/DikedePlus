import request from '@/utils/request'
/**
// 工单状态统计
 *
 * @param {*} start 开始时间
 * @param {*} end 结束时间
 * @returns
 */
export function getWorkorderAPI(start, end) {
  return request({
    url: `/api/task-service/task/collectReport/${start}/${end}`,
    method: 'get'

  })
}
/**
 * 销售额统计
 * @param {*} collectType 按月或日统计
 * @param {*} start 开始时间
 * @param {*} end 结束时间
 * @returns
 */
export function getamountCollectAPI(collectType, start, end) {
  return request({
    url: `/api/order-service/report/amountCollect/${collectType}/${start}/${end}`,
    method: 'get'

  })
}
/**
 *销售热榜
 * @param {*} topValue 几天数据
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function ListofgoodshotAPI(topValue, start, end) {
  return request({
    url: `/api/order-service/report/skuTop/${topValue}/${start}/${end}`,
    method: 'get'

  })
}
