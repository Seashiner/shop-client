
import {reqTrade,reqPayment} from '@/api'

const state = {
  tradeList : {},
  payList : {}
}

const mutations = {
  RECEIVE_TRADE_LIST(state,tradeList){
    state.tradeList = tradeList
  },

  RECEIVE_PAY_LIST(state,payList){
    state.payList = payList
  }
}

const actions = {
  async getTradeList({commit}){
    const result = await reqTrade()
    if(result.code === 200){
      const tradeList = result.data
      commit('RECEIVE_TRADE_LIST',tradeList)
    }
  },

  async getPayList({commit},orderId){
    const result = await reqPayment(orderId)
    if(result.code === 200){
      const payList = result.data
      commit('RECEIVE_PAY_LIST' ,payList)
    }
  }
}

const getters = {
  
}

export default {
  state,
  getters,
  actions,
  mutations
}