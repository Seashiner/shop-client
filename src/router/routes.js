import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Detail from '../pages/Detail'

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