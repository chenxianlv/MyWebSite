<template>
  <div id="main">
    <div class="box">
      首页施工中...
    </div>
  </div>
</template>

<script>
export default {
  name: "Main"
}
</script>

<style scoped lang="less">
  #main{
    height: 1000px;
    background-color: #fff;
  }
  .box {
    width: 400px;
    height: 400px;
    border-radius: $height;
    border: 10px solid @tint-font-color;
    line-height: 380px;
    text-align: center;
    font-weight: 700;
    color: @tint-font-color;
    font-size: 60px;
    margin:200px auto;
    transform: rotate(20deg);
  }
</style>
