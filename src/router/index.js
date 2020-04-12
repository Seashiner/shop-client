import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

//指定成功回调的onResolve默认值为空函数 / 指定失败回调的onReject默认值为空函数 
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onResolve = () => {}, onReject) {
  return originalPush.call(this, location, onResolve, onReject)
}

//catch处理错误
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onResolve ,onReject) {
  return originalReplace.call(this, location ,onResolve ,onReject).catch(() => {})
}



export default new VueRouter({
  mode:'history',
  routes,

  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})