import request from '@/utils/request'

export const publishImg = (data) => {
  return request({
    method: 'POST',
    url: '/houses/image',
    data
  })
}
