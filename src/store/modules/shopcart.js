import {reqAddToCart,reqCartList,reqCheckToCart,reqDeleteCart} from '@/api'

const state = {
  cartList : {}
}

const mutations = {
  RECEIVE_CARTLIST(state,cartList){
    state.cartList = cartList
  }
}

const actions = {
  //切换选中状态
  async reqCheckToCart({commit},{skuId,isChecked}){
    const result = await reqCheckToCart(skuId,isChecked)
    if(result.code!==200){
      return new Error('切换选中失败')
      // return Promise.reject(new Error('删除购物车失败'))
    }
  },
  //删除所有购物项操作
  async reqDeleteCart2({commit},skuId){
    const result = await reqDeleteCart(skuId)
    if(result.code!==200){
      return new Error('删除购物车失败')
      // return Promise.reject(new Error('删除购物车失败'))
    }
  },
  //删除单项购物项操作
  async reqDeleteCart({commit},skuId){
    const result = await reqDeleteCart(skuId)
    return result.code===200 ? '' : (result.message || '删除购物车失败')
  },


  // async addToCart ({commit}, {skuId, skuNum, callback}) {
  //   const result = await reqAddToCart(skuId, skuNum)
  //   if (result.code===200) { // 成功
  //     callback('')
  //   } else { // 失败
  //     callback(result.message || '添加购物车失败')
  //   }
  // },
  async addToCart ({commit}, {skuId, skuNum}) {
    const result = await reqAddToCart(skuId, skuNum)
    return result.code===200 ? '' : (result.message || '添加购物车失败')
  },

  
  async addToCart2 ({dispatch}, {skuId, skuNum}) {
    const result = await reqAddToCart(skuId, skuNum)
    if(result.code===200){
      dispatch('getCartList')
    }else{
      alert(result.message || '添加购物车失败')
    }
  },
  
  async getCartList ({commit}) {
    const result = await reqCartList()
    if(result.code===200){
      const cartList = result.data
      commit('RECEIVE_CARTLIST',cartList)
    }
  },

  
}

const getters = {
  //返回所有选中项数组
  selectedItems(state){
    return state.cartList.reduce((pre,item,index) => {
      if(item.isChecked === 1){
        pre.push(item)
      }
      return pre
    },[])
  },

  //总数量
  totalCount(state){
    let total = 0;
    state.cartList.forEach(item => {
      if(item.isChecked === 1){
        total += item.skuNum
      }
    })
    return total
  },

  //总价格
  totalPrice(state){
    return state.cartList.reduce((pre , item ) => {
      if(item.isChecked === 1){
        return pre + item.skuNum * item.skuPrice
      }else{
        return pre
      }
    },0)
  },

  //全选
  isAllCheck(state){
    return state.cartList.length>0 && state.cartList.every(item  => item.isChecked === 1)
  },
    
}



export default {
  state,
  getters,
  actions,
  mutations
}


















