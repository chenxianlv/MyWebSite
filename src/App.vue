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
  .w {
    width: 1200px;
    margin: 0 auto;
  }

</style>
