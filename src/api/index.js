import ajax from './ajax'
import ajaxMock from './ajaxMock'

//封装函数
//  /api/product/getBaseCategoryList
export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList')

//  /api/user/passport/login
// export const reqLogin = (mobile , password) => ajax.post('/product/getBaseCategoryList' , {mobile , password})

export const reqBanners = () => ajaxMock.get('/banners')

export const reqFloors = () => ajaxMock.get('/floors')

export const reqSearch = (searchParams) => ajax.post('/list' , searchParams)

export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)

export const reqAddToCart = (skuId,skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
//获取购物车列表
export const reqCartList = () => ajax.get(`/cart/cartList`)
//切换商品选中状态
export const reqCheckToCart = (skuId,isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
//删除购物车商品
export const reqDeleteCart = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)
//注册
export const reqRegister = (userInfo) => ajax.post(`/user/passport/register/`,userInfo)
//验证码
export const reqCode = () => ajax.get(`/user/passport/code`)
//登录
export const reqLogin = (mobile,password) => ajax.post(`/user/passport/login`,{mobile,password})
//退出登录
export const reqLogout = () => ajax.get(`/user/passport/logout`)









