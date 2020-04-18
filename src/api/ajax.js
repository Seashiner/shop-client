import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const service = axios.create({
  baseURL : "/api",
  timeout : 15000
})

service.interceptors.request.use((config)=>{
  NProgress.start();

  config.headers['userTempId'] = store.state.user.userTempId
  
  const token = store.state.user.userInfo.token
  if(token){
    config.headers['token'] = token
  }

  return config
})

service.interceptors.response.use(
  response =>{
    NProgress.done()
    return response.data
  },
  error => {
    console.log(error.message)
    return Promise.reject(error)
  }
)

export default service