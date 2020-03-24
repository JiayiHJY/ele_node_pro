import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false

import axios from 'axios'
const http = axios.create({
  baseURL: 'http://localhost:3001/api'
})
Vue.prototype.$http = http

http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
}, error => {
    return Promise.reject(error)
})

http.interceptors.response.use(res=> {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      message: err.response.data.message,
      type: 'error'
    })
      if (err.response.status === 401) {
          router.push('/login')
      }
  }
  return Promise.reject(err)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
