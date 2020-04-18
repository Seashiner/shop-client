import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

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

const router = new VueRouter({
  mode:'history',
  routes,

  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})


//只有登陆了, 才能查看交易/支付/个人中心界面
const checkPath = ['/trade' , '/pay' , '/center']
router.beforeEach((to,from,next) => {
  const targetPath = to.path;
  if(checkPath.find(item => targetPath.indexOf(item) === 0)){
    if(store.state.user.userInfo.name){
      next()
    }else{
      //如果用户没用登录，就去登录页面，这里携带query参数,记录下用户想要去的页面，方便登录之后跳转
      next('/login?redirect='+ targetPath)
    }
  }else{
    next()
  }

})


export default router

