import request from '@/utils/request'

/**
 * 人员统计头部信息
 * @param {*} start 开始时间 2020-01-01 00:00:00
 * @param {*} end 结束时间 2020-01-01 23:59:59
 * @returns
 */
export const taskReportInfoAPI = (start, end) => {
  return request({
    url: `/api/task-service/task/taskReportInfo/${start}/${end}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
