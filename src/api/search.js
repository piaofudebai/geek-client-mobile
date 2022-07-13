import request from '@/utils/request'

/*
* 请求搜索建议
*/
export const getSearchList = ({ name, id }) => {
  return request({
    method: 'GET',
    url: '/area/community',
    params: { name, id }
  })
}
