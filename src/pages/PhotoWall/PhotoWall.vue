<template>
  <div id="PhotoWall">
    <UserMask :closeMask="closeMask" v-if="isMaskShowing">
      <div class="slot-box">
        <img :src="selectedImg.url" alt="">
        <div class="upper">上传者：{{ selectedImg.upper }}</div>
        <div class="date">上传于：{{ handleFormatData(selectedImg.date, true) }}</div>
        <div class="description">照片描述：{{ selectedImg.description }}</div>
      </div>
    </UserMask>
    <Carousel :openMask="openMask"></Carousel>
    <Menu :openMask="openMask"></Menu>
  </div>
</template>

<script>
import Carousel from "@/pages/PhotoWall/Carousel"
import Menu from "@/pages/PhotoWall/Menu"
import UserMask from "@/components/UserMask/UserMask"
import mixin_UserMask from "@/assets/mixin/UserMask"
import {mapState} from 'vuex'
import {formatDate} from "@/assets/js";

export default {
  name: "PhotoWall",
  mixins: [mixin_UserMask],
  components: {
    Carousel, Menu, UserMask
  },
  computed: {
    ...mapState(['selectedImg'])
  },
  methods: {
    handleFormatData() {
      return formatDate(...arguments)
    },
  }
}
</script>

<style scoped lang="less">
#PhotoWall {
  padding-bottom: 50px;
  background-color: #fff;
}

.slot-box {
  width: 870px;

  img {
    width: 100%;
    margin-bottom: 10px;
  }

  div {
    margin-bottom: 8px;
  }
}
</style>
