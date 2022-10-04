import request from '@/utils/request'

/**
 * 获取用户列表、搜索
 * @param {Object} params 搜索功能要携带的参数
 * @returns
 */
export const getWorkListAPI = (params) => {
  return request({
    url: '/api/user-service/user/searchUserWork',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}

/**
 * 获取用户工作的详细信息
 * @param {Object} params
 * @returns
 */
export const getWorkDetailsAPI = (params) => {
  return request({
    url: '/api/task-service/task/userWork',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}
