import request from '@/utils/request'

// 发布出租
export const pubhouse = (data) => {
  return request({
    method: 'POST',
    url: '/user/houses',
    data
  })
}

// 查看已发布的房源
export const getPubHouse = (params) => {
  return request({
    method: 'GET',
    url: '/user/houses',
    params
  })
}
// 查看我的收藏
export const getFavorate = (params) => {
  return request({
    method: 'GET',
    url: '/user/favorites',
    params
  })
}
