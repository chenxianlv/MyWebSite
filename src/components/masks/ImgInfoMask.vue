<template>
  <div class="container">
    <div class="mask"></div>
    <div class="info"></div>
    <a href="javascript:" class="return iconfont">&#xe6aa;</a>
  </div>
</template>

<script>
export default {
  name: "ImgInfoMask"
}
</script>

<style scoped lang="less">
  @info-width: 800px;
  @info-height: 600px;
  @return-left-from-info: 25px;
  @return-up-from-info: 25px;
  .container {
    z-index: 999;
  }
  .info {
    position: fixed;
    width: @info-width;
    height: @info-height;
    left: 50%;
    top: 50%;
    margin-left: -0.5*@info-width;
    margin-top: -0.5*@info-height;
    background-color: #fff;
  }

  .return {
    position: fixed;
    display: block;
    width: 36px;
    height: 36px;
    line-height: $height;
    text-align: center;
    border-radius: $height./2;
    left: 50%;
    top: 50%;
    margin-left: -0.5*$width + 0.5*@info-width + @return-left-from-info;
    margin-top: -0.5*$height - 0.5*@info-height - @return-up-from-info;
    background-color: rgba(0,0,0,.3);
    color: #fff;
  }
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.3);
  }
</style>
