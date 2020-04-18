import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Center from '../pages/Center'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import MyOrder from '../pages/Center/MyOrder'
import TeamOrder from '../pages/Center/TeamOrder'
import store from '@/store'


export default [
  {
    path:'/',
    component : Home
  },
  {
    path:'/home',
    component : Home
  },
  {
    name:'center',
    path:'/center',
    component : Center,
    children:[
      {
        path:'',
        redirect:'/center/myOrder',
        // component : MyOrder
      },
      {
        name:'myOrder',
        path:'myOrder',
        component : MyOrder
      },
      {
        name:'teamOrder',
        path:'teamOrder',
        component : TeamOrder
      },
    ]
  },
  {
    name:'trade',
    path:'/trade',
    component : Trade,
    beforeEnter: (to, from, next) => {
      if(from.path === '/shopCart'){
        next()
      }else{
        next('/shopCart')
      }
    }
  },
  {
    name:'pay',
    path:'/pay',
    component : Pay,
    props:route => ({orderId : route.query.orderId}),
    beforeEnter: (to, from, next) => {
      if(from.path === '/trade'){
        next()
      }else{
        next('/trade')
      }
    }
  },
  {
    name:'paySuccess',
    path:'/paySuccess',
    component : PaySuccess,
    beforeEnter: (to, from, next) => {
      if(from.path === '/pay'){
        next()
      }else{
        next('/pay')
      }
    }
  },
  {
    name:'search',
    path:'/search/:keyword?',
    component : Search
  },
  {
    name:'detail',
    path:'/detail/:skuId',
    component : Detail
  },
  {
    name:'addCartSuccess',
    path:'/addCartSuccess',
    component : AddCartSuccess,
    beforeEnter: (to, from, next) => {
      const userInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
      const {skuNum,skuId} = to.query
      if(userInfo && skuNum && skuId){
        next()
      }else{
        next(from.path)
      }
    }
  },
  {
    name:'shopCart',
    path:'/shopCart',
    component : ShopCart,
  },
  {
    path:'/register',
    component : Register,
    meta : {isHideFooter:true}
  },

  {
    path:'/login',
    component : Login,
    meta : {isHideFooter:true},

    beforeEnter: (to, from, next) => {
      if(store.state.user.userInfo.name){
        next('/')
      }else{
        next()
      }
    }
  },

]