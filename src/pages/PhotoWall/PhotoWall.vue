<template>
  <div id="PhotoWall">
    <div id="content" v-if="requestState === 'success'">
      <UserMask :closeMask="closeMask" v-if="isMaskShowing">
        <div class="slot-box">
          <img :src="selectedImg.url" alt="">
          <div class="upper">上传者：{{ selectedImg.user }}</div>
          <div class="date">上传于：{{ handleFormatData(selectedImg.date, true) }}</div>
          <div class="description">照片描述：{{ selectedImg.description }}</div>
        </div>
      </UserMask>
      <Carousel :openMask="openMask"></Carousel>
      <Menu :openMask="openMask"></Menu>
    </div>
    <div class="failed" v-if="requestState === 'failed'">获取数据失败！</div>
    <div class="loading" v-if="requestState === 'waiting'">加载中...</div>
  </div>
</template>

<script>
import Carousel from "@/pages/PhotoWall/Carousel"
import Menu from "@/pages/PhotoWall/Menu"
import UserMask from "@/components/UserMask/UserMask"
import mixin_UserMask from "@/assets/mixin/UserMask"
import {mapState,mapActions} from 'vuex'
import {formatDate} from "@/assets/js";

export default {
  name: "PhotoWall",
  mixins: [mixin_UserMask],
  data() {
    return {
      requestState: 'waiting'
    }
  },
  components: {
    Carousel, Menu, UserMask
  },
  computed: {
    ...mapState(['selectedImg'])
  },
  methods: {
    ...mapActions(['getPicture']),
    handleFormatData() {
      return formatDate(...arguments)
    },
  },
  mounted() {
    this.getPicture().then(() => {
      this.requestState = 'success'
    }).catch(err => {
      this.requestState = 'failed'
      console.log(err)
    })
  }
}
</script>

<style scoped lang="less">
#PhotoWall {
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
