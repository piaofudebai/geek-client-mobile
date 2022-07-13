import request from '@/utils/request'
// import store from '@/store'
/*
首页轮播图
 */
export const getSwiper = () => {
  return request({
    method: 'GET',
    url: '/home/swiper'
  })
}
