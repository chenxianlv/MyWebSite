<template>
  <header>
    <nav class="w">
      <ul class="navLeft">
        <li><router-link to="/main">首页</router-link></li>
        <li><router-link to="/photoWall">照片墙</router-link></li>
        <li><router-link to="/msgBoard">讨论区</router-link></li>
      </ul>
      <ul>
        <li id="userInfo">
          <i></i>
          <router-link to="/">账号</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "UserHeader"
}
</script>

<style scoped lang="less">
  header {
    background-color: skyblue;
  }
  .navLeft {
    float: left;
    & li {
      display: block;
      height: 40px;

    }
  }
</style>
