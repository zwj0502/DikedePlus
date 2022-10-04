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

/**
 * 把用户从列表中删除
 * @param {Number} id 用户的id
 * @returns
 */
export const delUserAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/api/user-service/user/${id}`
  })
}

/**
 * 获取区域列表
 * @returns
 */
export const getRegionAPI = (params) => {
  return request({
    url: '/api/vm-service/region/search',
    method: 'GET',
    params
  })
}

/**
 * 增加用户
 * @param {*} data
 * @returns
 */
export const addUserAPI = (data) => {
  return request({
    url: '/api/user-service/user',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

/**
 * 更改用户信息
 * @param {Number} id 角色的id(路径参数)
 * @param {Object} data 用户信息的对象
 * @returns
 */
export const editUserAPI = (id, data) => {
  return request({
    url: `/api/user-service/user/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 根据信息搜索人员
 * @param {Object} params
 * @returns
 */
export const searchUserAPI = (params) => {
  return request({
    url: '/api/user-service/user/search',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}
