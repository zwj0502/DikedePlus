import request from '@/utils/request'
/**
 * 请求验证码图片
 * @param {*} clientToken
 * @returns
 */
export const getYzPhotoAPI = (clientToken) => {
  return request({
    url: `/api/user-service/user/imageCode/${clientToken}`,
    responseType: 'blob'
  })
}
/**
 * 登录
 * @param {*} data
 * @returns
 */
export const LoginAPI = (data) => {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data
  })
}
