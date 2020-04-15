import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'

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
    component : AddCartSuccess
  },
  {
    name:'shopCart',
    path:'/shopCart',
    component : ShopCart
  },
  {
    path:'/register',
    component : Register,
    meta : {isHideFooter:true}
  },

  {
    path:'/login',
    component : Login,
    meta : {isHideFooter:true}
  },

]