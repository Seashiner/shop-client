import {getUUID} from '@/utils/storageUtils.js'
import {reqRegister,reqLogin,reqLogout} from '@/api'

const state = {
  userInfo : JSON.parse(localStorage.getItem('USER_INFO_KEY') )|| {}, //登录用户信息
  userTempId : getUUID() //临时ID
}
const getters = {}
const mutations = {
  RECEIVE_REGISTER(state ,userInfo){
    state.userInfo = userInfo
  },
  RECEIVE_LOGOUT(state){
    state.userInfo = {}
  }
}
const actions = {
  //注册
  async reqRegister({commit},userInfo){
    const result = await reqRegister(userInfo)
    if(result.code !== 200){
      throw new Error(result.message || '注册失败')
    }
  },
  //登录
  async reqLogin({commit},{mobile,password}){
    const result = await reqLogin(mobile,password)
    if(result.code === 200){
      const userInfo = result.data
      localStorage.setItem('USER_INFO_KEY',JSON.stringify(userInfo))
      commit('RECEIVE_REGISTER',userInfo)
    }else{
      throw new Error(result.message || '登录失败')
    }
  },
  //退出登录
  async reqLogout({commit}){
    const result = await reqLogout()
    if(result.code !== 200){
      throw new Error('退出登录失败')
    }else{
      localStorage.removeItem('USER_INFO_KEY')
      commit('RECEIVE_LOGOUT')
    }
  },
}

export default ({
  state,
  getters,
  mutations,
  actions,
})


