import { setToken, getToken, removeToken } from '@/utils/storage'
export default {
  namespaced: true,
  //   开启命名空间
  state () {
    return {
      token: getToken() || ''
    }
  },
  // 传入的token赋值给默认值
  mutations: {
    setToken (state, token) {
      state.token = token
      // 存储到本地
      setToken(token)
    },
    logout (state) {
      state.token = ''
      removeToken()
    }
  }
}
