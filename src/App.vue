<template>
  <div id="app">
    <UserHeader></UserHeader>
    <router-view class="w"></router-view>
    <UserFooter></UserFooter>
  </div>
</template>

<script>
import './assets/css/reset.css'
//todo 侧边栏
import UserHeader from "@/components/UserHeader/UserHeader"
import UserFooter from "@/components/UserFooter/UserFooter"

export default {
  name: 'App',
  components: {
    UserHeader,UserFooter
  },
}
</script>

<style lang="less">
  body {
    background-color: #f6f6f6;
  }
  .w {
    width: @page-width;
    margin: 0 auto;
  }
  .clearfix {
    *zoom:1;
    &::before,&::after {
      content: '';
      display: table;
    }
    &::after {
      clear: both;
    }
  }
  @font-face {
    font-family: 'iconfont';
    src: url('./assets/fonts/iconfont.ttf?t=1631778171509') format('truetype');
  }
  .iconfont {
    font-family: "iconfont",serif !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
