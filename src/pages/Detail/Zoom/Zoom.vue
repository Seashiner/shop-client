<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event"  @mousemove="handleMove" ref = "event"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref= "mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:{
      imgUrl : String,
      bigImgUrl : String
    },
    mounted() {
      //单独定义一个maskWidth属性，这句话写在handleMove函数里也能正常执行
      this.maskWidth = this.$refs.event.clientWidth /2
    },
    methods: {
      handleMove(event){
        const {offsetX , offsetY} = event
        const maskWidth = this.maskWidth
        let left = offsetX - maskWidth/2
        let top = offsetY - maskWidth/2

        if(left<0){
          left=0
        }else if(left>maskWidth){
          left=maskWidth
        }

        if(top<0){
          top=0
        }else if(top>maskWidth){
          top=maskWidth
        }

        const maskDiv = this.$refs.mask;
        
        maskDiv.style.top = top + 'px'
        maskDiv.style.left = left + 'px'

        const imgDiv = this.$refs.bigImg;
        imgDiv.style.top = -2*top + 'px'
        imgDiv.style.left = -2*left + 'px'

      }

    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;

    img {
      width: 100%;
      height: 100%
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #ccc;
      overflow: hidden;
      z-index: 998;
      display: none;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>