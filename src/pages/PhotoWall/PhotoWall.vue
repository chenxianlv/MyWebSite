<template>
  <div id="PhotoWall">
    <Carousel></Carousel>
    <Menu></Menu>
  </div>
</template>

<script>
//todo 遮罩
import Carousel from "@/pages/PhotoWall/Carousel"
import Menu from "@/components/Menu/Menu"
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
    padding-bottom: 50px;
    background-color: #fff;
  }
</style>
