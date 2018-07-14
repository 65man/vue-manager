import { getToken, setToken } from '@/utils/auth'
import { loginByUser } from '@/api/login'

// removeToken
const user = {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN: function (state, token) {
      state.token = setToken(token)
    }
  },
  actions: {
    LoginByUsername ({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUser(username, userInfo.password).then(() => {
          console.log('成功')
          // const data = res.data
          // commit('SET_TOKEN', data.token)
          // setToken(data.token)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
