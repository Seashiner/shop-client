import ajax from './ajax'
import ajaxMock from './ajaxMock'

//封装函数
//  /api/product/getBaseCategoryList
export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList')

//  /api/user/passport/login
export const reqLogin = (mobile , password) => ajax.post('/product/getBaseCategoryList' , {mobile , password})

export const reqBanners = () => ajaxMock.get('/banners')

export const reqFloors = () => ajaxMock.get('/floors')










