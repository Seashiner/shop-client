<template>
  <div class="main">

    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          <li class="with-x" v-if="options.categoryName">{{options.categoryName}}<i @click='deleteCategory'>×</i></li>
          <li class="with-x" v-if="options.trademark">{{options.trademark}}<i @click='deleteTrademark'>×</i></li>
          <li class="with-x" v-if="options.keyword">{{options.keyword}}<i @click='deleteKeyword'>×</i></li>

          <li class="with-x" v-if="options.props" v-for="(prop, index) in options.props" :key="index">{{prop}}<i @click='deleteprop(index)'>×</i></li>
        </ul>
      </div>
      <!--selector-->
      <div class="clearfix selector">
        <div class="type-wrap logo">
          <div class="fl key brand">品牌</div>
          <div class="value logos">
            <ul class="logo-list">
              <li v-for="trade in trademarkList" :key="trade.tmId" @click = 'addTmName(trade)'>{{trade.tmName}}</li>
            </ul>
          </div>
          <div class="ext">
            <a href="javascript:void(0);" class="sui-btn">多选</a>
            <a href="javascript:void(0);">更多</a>
          </div>
        </div>
        <div class="type-wrap" v-for="attrs in attrsList" :key="attrs.attrId">
          <div class="fl key">{{attrs.attrName}}</div>
          <div class="fl value">
            <ul class="type-list">
              <li v-for="(att, index) in attrs.attrValueList" :key="index" @click = 'addProp(att,index,attrs.attrName)'>
                <a>{{att}}</a>
              </li>
            </ul>
          </div>
          <div class="flext"></div>
        </div>
      </div>
      <!--details-->
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li :class = "{active:isActive('1')}" @click="setOrder('1')">
                <a href="#">综合{{getOrderIcon('1')}}</a>
              </li>
              <li>
                <a href="#">销量</a>
              </li>
              <li>
                <a href="#">新品</a>
              </li>
              <li>
                <a href="#">评价</a>
              </li>
              <li :class = "{active:isActive('2')}" @click="setOrder('2')">
                <a href="#">价格{{getOrderIcon('2')}}</a>
              </li>
              <!-- <li>
                <a href="#">价格⬇</a>
              </li> -->
            </ul>
          </div>
        </div>
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
              <div class="list-wrap">
                <div class="p-img">
                  <a>
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg"/>
                    </router-link>
                  </a>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>{{goods.price}}</i>
                  </strong>
                </div>
                <div class="attr">
                  <a href="javascript:;">{{goods.title}}</a>
                </div>
                <div class="commit">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate">
                  <a
                    href="success-cart.html"
                    target="_blank"
                    class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                  <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- 页码 -->
        <Pagination :pageConfig="{
          total:productList.total, //总数据
          showPageNo:3, //连续页码数
          pageNo:options.pageNo, //当前页
          pageSize:options.pageSize //总页数
        }"
        @changeCurrentPage = "changeCurrentPage"
        />

      </div>
      <!--hotsale-->
      <div class="clearfix hot-sale">
        <h4 class="title">热卖商品</h4>
        <div class="hot-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_01.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_03.png" />
                </div>
                <div class="attr">
                  <em>金属A面，360°翻转，APP下单省300！</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_04.png" />
                </div>
                <div class="attr">
                  <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4068.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有20人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState , mapGetters} from 'vuex'

export default {
  name: "",
  data() {
    return {
      options : {
        categoryId: '' ,//一级分类ID
        categoryId2: '' ,//二级分类ID
        categoryId3: '',// 三级分类ID
        categoryName: '',//分类名称
        keyword:'',//搜索关键字
        // trademark:'',//品牌ID:品牌名称
        order:'2:desc',//排序方式  综合1,价格2 升序asc,降序desc"2:desc"
        pageNo:1,//当前第几页
        pageSize:3,//每页最多显示多少条数据	
        props:[] 	//多个属性条件组件的数组[‘属性ID:属性值, 属性名’]
              // [
              //   "2:6.65-6.74英寸:屏幕尺寸",
              //   "4:16GB:机身存储"
              // ]
      }
    } 
  },
  mounted() {
    // const {query , params} = this.$route   //$route.params.keyword
    
    // const options = {
    //   ...this.options,
    //   categoryId: '' ,//一级分类ID
    //   categoryId2: '' ,//二级分类ID
    //   categoryId3: '',// 三级分类ID
    //   categoryName: '',
    //   ...query,
    //   ...params
    // }
    // this.options = options
    // this.getProduction()
  },
  computed: {
    ...mapState({
        productList: state => state.search.productList
      }),
    ...mapGetters(['trademarkList' , 'attrsList' , 'goodsList'])
  },
  watch: {
    '$route':{
      handler:function(to , from){
        const {query , params} = to;
        console.log(to.params);
        const options = {
        ...this.options,
        categoryId: '' ,//一级分类ID
        categoryId2: '' ,//二级分类ID
        categoryId3: '',// 三级分类ID
        categoryName: '',
        ...query,
        ...params
        }
        this.options = options
        this.getProduction()
      },
      immediate:true
    }
  },
  methods: {
    getProduction(pageNo=1){
      this.options.pageNo = pageNo
      this.$store.dispatch('getProductList',this.options)
    },
    changeCurrentPage(page){
      // this.options.pageNo = page
      this.getProduction(page)
    },
    //排序
    setOrder(orderId){
      let [Id , Type] = this.options.order.split(':')

      if(orderId === Id){
        Type = Type === 'desc' ? 'asc': 'desc'
      }else{
        Type = 'desc'
      }
      this.options.order = `${orderId}:${Type}`
      this.getProduction()
    },
    getOrderIcon(orderId){
      let [Id , Type] = this.options.order.split(':')

      if(orderId === Id){
        return Type === 'desc' ? '⬇': '⬆'
      }else{
        return '⬇'
      }
    },
    //排序是否选中
    isActive(orderFlag){
      return this.options.order.indexOf(orderFlag) === 0
    },



    //筛选属性
    addProp(id,value,name){
      const prop = `${id}:${value}:${name}`
      if(this.options.props.indexOf (prop)===-1 ){
        this.options.props.push(prop)
        this.getProduction()
      }
    },
    //筛选品牌
    addTmName(trade){
      this.$set(this.options , 'trademark' , trade.tmId + ':' + trade.tmName)
      // this.options.trademark = trade.tmId + ':' + trade.tmName
      this.getProduction()
    },
    
    //删除产品名
    deleteCategory(){
      this.options.categoryName = '';
      this.options.categoryId = '';
      this.options.categoryId2 = '';
      this.options.categoryId3 = '';
      //重新发送请求
      this.getProduction()
      this.$router.replace(this.$route.path)
    },
    //删除品牌
    deleteTrademark(){
      this.$delete(this.options , 'trademark')
      // this.options.trademark = ''
      this.getProduction()
    },
    //删除关键字
    deleteKeyword(){
      this.options.keyword = ''

      this.$bus.$emit('deleteKeyword')

      this.getProduction()
      this.$router.replace({path : '/search', query : this.$route.query})

    },
    //删除多属性
    deleteprop(index){
      this.options.props.splice(index , 1)
      this.getProduction()
    }
  },
};
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;
    .py-container {
      width: 1200px;
      margin: 0 auto;
      .bread {
        margin-bottom: 5px;
        overflow: hidden;
        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;
          li {
            display: inline-block;
            line-height: 18px;
            a {
              color: #666;
              text-decoration: none;
              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }
        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;
          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;
            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }
            &:hover {
              color: #28a3ef;
            }
          }
        }
      }
      .selector {
        border: 1px solid #ddd;
        margin-bottom: 5px;
        overflow: hidden;
        .logo {
          border-top: 0;
          margin: 0;
          position: relative;
          overflow: hidden;
          .key {
            padding-bottom: 87px !important;
          }
        }
        .type-wrap {
          margin: 0;
          position: relative;
          border-top: 1px solid #ddd;
          overflow: hidden;
          .key {
            width: 100px;
            background: #f1f1f1;
            line-height: 26px;
            text-align: right;
            padding: 10px 10px 0 15px;
            float: left;
          }
          .value {
            overflow: hidden;
            padding: 10px 0 0 15px;
            color: #333;
            margin-left: 120px;
            padding-right: 90px;
            .logo-list {
              li {
                float: left;
                border: 1px solid #e4e4e4;
                margin: -1px -1px 0 0;
                width: 105px;
                height: 52px;
                text-align: center;
                line-height: 52px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 700;
                color: #e1251b;
                font-style: italic;
                font-size: 14px;
                img {
                  max-width: 100%;
                  vertical-align: middle;
                }
              }
            }
            .type-list {
              li {
                float: left;
                display: block;
                margin-right: 30px;
                line-height: 26px;
                a {
                  text-decoration: none;
                  color: #666;
                }
              }
            }
          }
          .ext {
            position: absolute;
            top: 10px;
            right: 10px;
            .sui-btn {
              display: inline-block;
              padding: 2px 14px;
              box-sizing: border-box;
              margin-bottom: 0;
              font-size: 12px;
              line-height: 18px;
              text-align: center;
              vertical-align: middle;
              cursor: pointer;
              padding: 0 10px;
              background: #fff;
              border: 1px solid #d5d5d5;
            }
            a {
              color: #666;
            }
          }
        }
      }
      .details {
        margin-bottom: 5px;
        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;
          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;
              li {
                float: left;
                line-height: 18px;
                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }
                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
        .goods-list {
          margin: 20px 0;
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;
              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;
                  a {
                    color: #666;
                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }
                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;
                  strong {
                    font-weight: 700;
                    i {
                      margin-left: -5px;
                    }
                  }
                }
                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }
                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;
                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }
                .operate {
                  padding: 12px 15px;
                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }
                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;
                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }
                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;
                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }
        
      }
      .hot-sale {
        margin-bottom: 5px;
        border: 1px solid #ddd;
        .title {
          font-weight: 700;
          font-size: 14px;
          line-height: 21px;
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          margin: 0;
          padding: 5px 0 5px 15px;
        }
        .hot-list {
          padding: 15px;
          ul {
            display: flex;
            li {
              width: 25%;
              height: 100%;
              .list-wrap {
                .p-img,
                .price,
                .attr,
                .commit {
                  padding-left: 15px;
                }
                .p-img {
                  img {
                    max-width: 100%;
                    vertical-align: middle;
                    border: 0;
                  }
                }
                .attr {
                  width: 85%;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                }
                .price {
                  font-size: 18px;
                  color: #c81623;
                  strong {
                    font-weight: 700;
                    i {
                      margin-left: -5px;
                    }
                  }
                }
                .commit {
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
