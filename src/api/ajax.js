import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
  baseURL : "/api",
  timeout : 15000
})

service.interceptors.request.use((config)=>{
  NProgress.start()
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