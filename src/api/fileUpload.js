import request from '@/utils/request'

/**
 * 图片文件的上传
 * @param {file} fileName 上传的文件
 * @returns
 */
export const upImageAPI = (data) =>
  request({
    url: 'api/vm-service/sku/fileUpload',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
