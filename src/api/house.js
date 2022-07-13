import request from '@/utils/request'

export const gethomebycityid = (params) => {
  return request({
    url: '/houses',
    params
  })
}
export const getHouseList = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
export const getCondition = (params) => {
  return request({
    method: 'GET',
    url: '/houses/condition',
    params
  })
}
export const getHouseParams = (params) => {
  return request({
    method: 'GET',
    url: '/houses/params',
    params
  })
}
