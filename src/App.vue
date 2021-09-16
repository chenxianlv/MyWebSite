<template>
  <div id="app">
    <UserHeader></UserHeader>
    <router-view class="w"></router-view>
    <UserFooter></UserFooter>
  </div>
</template>

<script>
import './assets/css/reset.css'

import UserHeader from "@/components/UserHeader/UserHeader"
import UserFooter from "@/components/UserFooter/UserFooter"

export default {
  name: 'App',
  components: {
    UserHeader,UserFooter
  }
}
</script>

<style lang="less">
  body {
    background-color: #f6f6f6;
  }
  .w {
    width: 1000px;
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
</style>
