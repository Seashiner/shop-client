import Mock from 'mockjs'
import banners from './banners.json'  //引入的是数据模板，自动解析为js数组
import floors from './floors.json'

Mock.mock('/mock/banners',{code : 200 , data : banners})
Mock.mock('/mock/floors',{code : 200 , data : floors})


