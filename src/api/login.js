import request from '@/utils/request'

export const loginByUser = (username, password) => {
  return request({
    url: 'login',
    method: 'post',
    data: {
      user_name: username,
      password
    }
  })
}
