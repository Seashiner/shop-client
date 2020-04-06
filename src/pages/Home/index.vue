<template>
  <div class="home">
    <!-- 商品分类导航 -->
    <TypeNav/>

    <!--列表-->
    <ListContainer/>

    <!--今日推荐-->
    <TodayRecommend/>

    <!-- 商品排行 -->
    <Rank/>

    <!-- 猜你喜欢 -->
    <Like/>

    <!--楼层-->
    <Floor/>

    <!--楼层-->
    <Floor/>

    <!--商标-->
    <Brand/>

  </div>
</template>

<script>
  import TypeNav from '../../components/TypeNav'
  import TodayRecommend from './TodayRecommend'
  import ListContainer from './ListContainer'
  import Rank from './Rank'
  import Like from './Like'
  import Floor from './Floor'
  import Brand from './Brand'

  export default {
    name: "Home",
    data() {
      return {};
    },
    components:{
      TypeNav,
      TodayRecommend,
      ListContainer,
      Rank,
      Like,
      Floor,
      Brand
    }
  };
</script>

<style lang="less" scoped>
  
</style>
