<template>
  <div id="PhotoWall">
    <Carousel :imgObjs="imgObjs"></Carousel>
  </div>
</template>

<script>
//todo 轮播图
import Carousel from "@/pages/PhotoWall/Carousel"
//todo 分类栏
export default {
  name: "PhotoWall",
  components:{
    Carousel,

  },
  data() {
    return {
      imgObjs: [
          {url:require('@/upload/imgs/photomode_10122020_175623.png'),description:'朱迪1'},
          {url:require('@/upload/imgs/photomode_12122020_220026.png'),description:'夜之城'},
          {url:require('@/upload/imgs/photomode_13122020_205120.png'),description:'朱迪2'},
      ]
    }
  },
}
</script>

<style scoped lang="less">
  #PhotoWall{
    height: 600px;
    background-color: lightpink;
  }
</style>
