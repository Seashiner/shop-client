<template>
  <!--分页组件-->
  <div class="pagination" v-if="pageConfig.total>0">
    <!--上一页-->
    <button :disabled="currentPage<=1" @click = "changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button @click = "changeCurrentPage(1)" v-if="startEnd.start>=2">1</button>
    <!-- 省略号 -->
    <button disabled v-if="startEnd.start>2">···</button>
      <!-- 连续页码 -->
    <button v-for="item in startEnd.end" :key="item" @click="changeCurrentPage(item)" v-if="item>=startEnd.start" :class="{active:item===currentPage}">{{item}}</button>

    <!-- 省略号 -->
    <button disabled v-if="startEnd.end<pageTotal-1">···</button>
    <!-- 最后一页 -->
    <!-- <button>{{pageTotal}}</button> -->
    <button :class="{active:pageTotal===currentPage}" v-if="startEnd.end<pageTotal">{{pageTotal}}</button>
    <!--下一页-->
    <button :disabled="currentPage>=pageTotal" @click = "changeCurrentPage(currentPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共 {{pageConfig.total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
     props: {
      pageConfig: {
        type: Object,
        default: {
          total: 0, // 总记录数量
          pageSize: 3, // 一页最多显示多条记录
          pageNo: 1, // 当前在第几页
          showPageNo: 3, // 连续显示的页码数
        }
      }
    },
    data(){
      return{
        currentPage: this.pageConfig.pageNo
      }
    },
    methods: {
      changeCurrentPage(page){
        this.currentPage = page
        this.$emit('changeCurrentPage',page)
      }
    },
    computed: {
      //连续页码的开始和结束页码
      startEnd:function(){
        let {showPageNo} = this.pageConfig
        let {pageTotal,currentPage} = this
        let start = currentPage - Math.floor(showPageNo/2)
        let end = currentPage + Math.floor(showPageNo/2)
        if(start<1){
          start=1
          end = start + showPageNo -1
        }
        if(end>pageTotal){
          end=pageTotal
          start = end -showPageNo +1
        }
        return {start , end}
      },
      //总页码
      pageTotal : function(){
        const {total , pageSize} = this.pageConfig
        if(total && pageSize){
          return Math.ceil(total/pageSize)
        }else{
          return 0
        }
        
      }
    },
    watch: {
      'pageConfig.pageNo'(value){
        this.currentPage = value
      }
    },
  }
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline:none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>