import axios from 'axios'
import store from '@/store'
import router from '@/router'
// import { Message } from 'element-ui'
const timeOut = 3600
function IsTimeOUt() {
  const currentTime = Date.now()
  const stampTime = (currentTime - store.getters.loginTime) / 1000
  return stampTime > timeOut
}
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

request.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    if (IsTimeOUt()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时'))
    }
    // 如果token存在 注入token
    config.headers['Authorization'] = store.getters.token
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})
export default request
