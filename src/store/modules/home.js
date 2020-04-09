import {reqBaseCategoryList , reqBanners , reqFloors} from '@/api'

const state = {
  baseCategoryList : [],
  banners : [],
  floors : []
}
const getters = {}

const mutations = {
  RECEIVE_CATEGORY(state , category){
    state.baseCategoryList = category.splice(0,category.length-2)
  },
  RECEIVE_BANNER(state , banner){
    state.banners = banner
  },
  RECEIVE_FLOORS(state , floor){
    state.floors = floor
  }
}

const actions = {
  async getBaseCategoryList({commit}) {
    const result = await reqBaseCategoryList()
    if(result.code === 200){
      const category = result.data
      commit('RECEIVE_CATEGORY' , category)
    }
  },

  async getBanners({commit}) {
    const result = await reqBanners()
    if(result.code === 200){
      const banner = result.data
      commit('RECEIVE_BANNER' , banner)
    }
  },

  async getFloors({commit}) {
    const result = await reqFloors()
    if(result.code === 200){
      const floor = result.data
      commit('RECEIVE_FLOORS' , floor)
    }
  }
  
}

export default ({
  state,
  getters,
  mutations,
  actions,
})