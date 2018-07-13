import { getToken, setToken, removeToken } from '@/utils/auth'

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

  }
}

export default user
