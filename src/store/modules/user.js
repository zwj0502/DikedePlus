import { LoginAPI } from '@/api/login'
import { getInfo } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userId: '',
    userInfo: {},
    loginTime: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    DEL_TOKEN(state) {
      state.token = null
    },
    DEL_USER_INFO(state) {
      state.userInfo = {}
    },
    GET_USERID(state, userId) {
      state.userId = userId
    },
    GET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    GET_TIME(state, loginTime) {
      state.loginTime = loginTime
    }
  },
  actions: {
    async loginActions({ commit }, data1) {
      const { data } = await LoginAPI(data1)
      console.log(data)
      commit('SET_TOKEN', data.token)
      commit('GET_USERID', data.userId)
      commit('GET_TIME', new Date().getTime())
    },
    async getUserInfo({ commit }, id) {
      const { data } = await getInfo(id)
      console.log(data)
      commit('GET_USER_INFO', data)
    },
    logout({ commit }) {
      commit('DEL_TOKEN')
      commit('DEL_USER_INFO')
    }
  }
}
