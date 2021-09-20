<template>
  <div id="app">
    <UserHeader></UserHeader>
    <router-view class="w body-common"></router-view>
    <SideBar></SideBar>
    <UserFooter></UserFooter>
  </div>
</template>

<script>
import './assets/css/reset.css'
import UserHeader from "@/components/UserHeader/UserHeader"
import UserFooter from "@/components/UserFooter/UserFooter"
import SideBar from "@/components/SideBar/SideBar"

export default {
  name: 'App',
  components: {
    UserHeader,
    UserFooter,
    SideBar
  },
}
</script>

<style lang="less">

  body {
    background-color: #f6f6f6;
  }
  .body-common {
    padding-top: @uer-header-height;
    box-shadow: 0 0 5px 3px rgba(0,0,0,.2);
    overflow: hidden;
    border-radius: 8px;
  }
</style>
