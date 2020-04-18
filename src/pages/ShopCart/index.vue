<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="isCartChecked(cart , $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="cart.skuNum--">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @change="changeSkuNum(cart,$event.target.value - cart.skuNum)">
            <a href="javascript:void(0)" class="plus" @click="cart.skuNum++">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteCart(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>


      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change = "isCartAllChecked($event)">
        <span >全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllChecked">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState , mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    mounted() {
      this.$store.dispatch('getCartList')
    },
    computed: {
      ...mapState({
        cartList: state => state.shopcart.cartList
      }),
      ...mapGetters(['totalCount','totalPrice','isAllCheck','selectedItems'])
    },
    methods: {
      //修改购物车数量
      async changeSkuNum(item , changeNum){
        const skuId = item.skuId
        if(item.skuNum + changeNum > 0){
          const msg = await this.$store.dispatch('addToCart',{skuId, skuNum:changeNum})
          if(msg){
            alert(msg)
          }else{
            this.$store.dispatch('getCartList')
          }
        }
        
      },
      //全部选中
      async isCartAllChecked(event){
        const {cartList} = this
        const isChecked = event.target.checked * 1
        const promises = []
        cartList.forEach((item) => {
          const promise = this.$store.dispatch('reqCheckToCart',{skuId:item.skuId,isChecked})
          promises.push(promise)
        })

        try{
            await Promise.all(promises)
            this.$store.dispatch('getCartList')
        }catch(error){
            alert(error.message)
        }
      },
      //单项选中
      async isCartChecked(cart,event){
        const isChecked = event.target.checked * 1
        // const isChecked = cart.isChecked === 1 ? 0 : 1
        const {skuId} = cart
        try {
          await this.$store.dispatch('reqCheckToCart',{skuId,isChecked})
          this.$store.dispatch('getCartList')
        } catch (error) {
          alert(error.message)
        }
        
      },
      //删除所有选中商品
      async deleteAllChecked(){
        const {selectedItems} = this
        if(selectedItems.length <= 0) return

        if(window.confirm('您确定要删除吗？')){
          let promises = []
          selectedItems.forEach(item => {
            const promise = this.$store.dispatch('reqDeleteCart2',item.skuId)
            promises.push(promise)
          })
          try{
            await Promise.all(promises)
            this.$store.dispatch('getCartList')
          }catch(error){
            alert(error.message || '删除失败！！')
          }
          
        }
        
      },
      //删除单项商品
      async deleteCart(skuId){
        if(window.confirm('您确定要删除吗？')){
          const msg = await this.$store.dispatch('reqDeleteCart',skuId)
          if(msg){
            alert(msg)
          }else{
            this.$store.dispatch('getCartList')
          }
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>