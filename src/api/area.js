import request from '@/utils/request'
// import store from '@/store'
/*
下拉城市
 */
export const getCity = (level) => {
  return request({
    method: 'GET',
    url: `/area/city?level=${level}`
  })
}
/*
获取热门城市
 */
export const gethot = () => {
  return request({
    method: 'GET',
    url: '/area/hot'
  })
}

/*
获取租房小组
 */
export const getGroups = (area) => {
  return request({
    method: 'GET',
    url: '/home/groups',
    params: {
      area
    }
  })
}
/**
 *根据城市id获取房源信息
 * @param {*} id {id}
 *
 */
export function getMapHouse (id) {
  return request({
    url: '/area/map',
    params: {
      id
    }
  })
}
