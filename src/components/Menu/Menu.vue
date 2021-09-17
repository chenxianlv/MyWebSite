<template>
  <div class="box">
    <ul>
      <li v-for="(imgMenuInfo,index) in $store.state.imgMenuInfos" :key="index">
        <router-link :to="'/photoWall'+imgMenuInfo.path">
          {{imgMenuInfo.title}}
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "Menu"
}
</script>

<style scoped lang="less">
  .box {
    width: 100%;
    height: 60px;
    margin-top: 15px;
    border-top: 1px solid #f0f2f7;
    border-bottom: 1px solid #f0f2f7;
    background-color: #fff;
  }
</style>
