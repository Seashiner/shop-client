<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav/>

    <h2>Search</h2>
    <p>query参数:{{$route.query.keyword}}</p>
    <p>params参数:{{$route.params.keyword}}</p>
  </div>
</template>

<script>
import TypeNav from '@/components/TypeNav'
export default {
 name: 'Search',
 data(){
   return{}
 },
 components:{
   TypeNav
 }
}
</script>

<style lang = "less" scoped>

</style>
