<template>
  <div id="PhotoWall">
    <ImgInfoMask :closeMask="closeMask" v-if="isMaskShowing"></ImgInfoMask>
    <Carousel :openMask="openMask"></Carousel>
    <Menu :openMask="openMask"></Menu>
  </div>
</template>

<script>
import Carousel from "@/pages/PhotoWall/Carousel"
import Menu from "@/components/Menu/Menu"
import ImgInfoMask from "@/components/masks/ImgInfoMask"
import {mapActions} from 'vuex'
export default {
  name: "PhotoWall",
  components:{
    Carousel,Menu,ImgInfoMask
  },
  methods: {
    ...mapActions(['showImgDetails']),
    closeMask() {
      this.isMaskShowing = false
    },
    openMask(imgObj){
      this.isMaskShowing = true
      this.showImgDetails(imgObj)
    }
  },
  data() {
    return {
      isMaskShowing:false
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
