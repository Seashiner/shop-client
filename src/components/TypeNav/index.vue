<template>
  <div class="type-nav">
      <div class="container">

        <div @mouseenter="isShowFirst=true" @mouseleave="hideFirst">
          <h2 class="all">全部商品分类</h2>
          
          <div class="sort" v-if="isShowFirst" @click="toSearch"  @mouseleave="hideCategory()">
            <div class="all-sort-list2">
              <div class="item" :class="{item_on:index===currentIndex}" v-for="(item , index) in baseCategoryList" :key="item.categoryId" @mouseenter="showCategory(index)">
                <h3>
                  
                  <a href="javascript:;" :data-categoryName = "item.categoryName" :data-categoryId = "item.categoryId">{{item.categoryName}}</a>
                  <!-- <router-link :to="{path:'/search', query:{categoryName:item.categoryName ,category1Id:item.categoryId}}" >{{item.categoryName}}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore"  v-for="item2 in item.categoryChild" :key="item2.categoryId">
                      <dt>
                        <a href="javascript:;" :data-categoryName = "item2.categoryName" :data-categoryId2 = "item2.categoryId">{{item2.categoryName}}</a>
                        <!-- <router-link :to="{path:'/search', query:{categoryName:item2.categoryName ,category2Id:item2.categoryId}}">{{item2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                          <a href="javascript:;" :data-categoryName = "item3.categoryName" :data-categoryId3 = "item3.categoryId">{{item3.categoryName}}</a>
                          <!-- <router-link :to="{path:'/search', query:{categoryName:item3.categoryName ,category3Id:item3.categoryId}}">{{item3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import debounce from 'lodash/debounce'
export default {
 name: 'TypeNav',
 data(){
   return{
     currentIndex : -1,
     isShowFirst : true
   }
 },
 mounted(){
    
 },
 methods: {
   showCategory:debounce(function(index){
     this.currentIndex=index
   },100),

   hideCategory(){
    this.currentIndex=-1
   },

   hideFirst(){
     if(this.$route.path !== '/'){
       this.isShowFirst = false
     }
   },

   toSearch(event){
     const {categoryname,categoryid ,categoryid2,categoryid3} = event.target.dataset
     console.dir(event.target.dataset);
     if(categoryname){
       const query = {categoryName : categoryname}

       if(categoryid){
         query.categoryId = categoryid
       }else if(categoryid2){
         query.categoryId2 = categoryid2
       }else if(categoryid3){
         query.categoryId3 = categoryid3
       }
      this.isShowFirst = false
      this.$router.push({path:'/search' ,query})
     }

   }
 },
 computed: {
   ...mapState({
     baseCategoryList : state => state.home.baseCategoryList
   })
 }
}
</script>

<style lang = "less" scoped>
  .type-nav {
      border-bottom: 2px solid #e1251b;
      .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;
        .all {
          width: 210px;
          height: 45px;
          background-color: #e1251b;
          line-height: 45px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
        }
        .nav {
          a {
            height: 45px;
            margin: 0 22px;
            line-height: 45px;
            font-size: 16px;
            color: #333;
          }
        }
        .sort {
          position: absolute;
          left: 0;
          top: 45px;
          width: 210px;
          height: 461px;
          position: absolute;
          background: #fafafa;
          z-index: 999;
          .all-sort-list2 {
            .item {
              h3 {
                line-height: 30px;
                font-size: 14px;
                font-weight: 400;
                overflow: hidden;
                padding: 0 20px;
                margin: 0;
                a {
                  color: #333;
                }
              }
              .item-list {
                display: none;
                position: absolute;
                width: 734px;
                min-height: 460px;
                _height: 200px;
                background: #f7f7f7;
                left: 210px;
                border: 1px solid #ddd;
                top: 0;
                z-index: 9999 !important;
                .subitem {
                  float: left;
                  width: 650px;
                  padding: 0 4px 0 8px;
                  dl {
                    border-top: 1px solid #eee;
                    padding: 6px 0;
                    overflow: hidden;
                    zoom: 1;
                    &.fore {
                      border-top: 0;
                    }
                    dt {
                      float: left;
                      width: 54px;
                      line-height: 22px;
                      text-align: right;
                      padding: 3px 6px 0 0;
                      font-weight: 700;
                    }
                    dd {
                      float: left;
                      width: 415px;
                      padding: 3px 0 0;
                      overflow: hidden;
                      em {
                        float: left;
                        height: 14px;
                        line-height: 14px;
                        padding: 0 8px;
                        margin-top: 5px;
                        border-left: 1px solid #ccc;
                      }
                    }
                  }
                }
              }
              &.item_on {
                background: #ccc;
                .item-list {
                  display: block;
                }
              }
            }
          }
        }
      }
    }
</style>
