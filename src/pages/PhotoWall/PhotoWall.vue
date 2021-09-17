<template>
  <div id="PhotoWall">
    <Carousel></Carousel>
    <Menu></Menu>
  </div>
</template>

<script>
import Carousel from "@/pages/PhotoWall/Carousel"
import Menu from "@/components/Menu/Menu"
//todo 分类栏
export default {
  name: "PhotoWall",
  components:{
    Carousel,Menu
  },
  data() {
    return {

    }
  },
}
</script>

<style scoped lang="less">
  #PhotoWall{
    height: 1500px;
    background-color: #fff;
  }
</style>
