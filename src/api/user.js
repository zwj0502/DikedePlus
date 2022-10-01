import request from '@/utils/request'

/**
 * 获取用户登录信息
 * @param {*} userId
 * @returns
 */
export function getInfo(userId) {
  return request({
    url: `/api/user-service/user/${userId}`,
    method: 'GET'
  })
}

/**
 * 取用户列表展示
 * @param {Object} params 携带的参数
 * @returns
 */
export const getUserRoleAPI = (params) => {
  return request({
    url: '/api/user-service/user/search',
    method: 'GET',
    params
  })
}
