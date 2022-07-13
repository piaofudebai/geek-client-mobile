import request from '@/utils/request'
// import store from '@/store'
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}
/*
* 获取用户信息
*/
export const getUserInfo = () => {
  return request({
    url: '/user',
    headers: {
      // Authorization: store.state.user.token
    }
  })
}
/**
 * 确认是否收藏
 * @param {*} id {true,false}
 * @returns
 */
export function favoritesTr (id) {
  return request({
    url: `/user/favorites/${id}`
  })
}
/**
 *添加收藏
 * @param {*} id {code}
 * @returns
 */
export function addFavorites (id) {
  return request({
    url: `/user/favorites/${id}`,
    method: 'POST'
  })
}
/**
 *删除房屋收藏
 * @param {*} id  {code}
 * @returns
 */
export function deleteFavorites (id) {
  return request({
    url: `/user/favorites/${id}`,
    method: 'DELETE'
  })
}
