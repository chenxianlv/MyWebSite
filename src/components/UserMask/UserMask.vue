<template>
    <transition-group tag="div" class="maskBox" name="maskAnimation" appear>
      <div class="mask" @click="closeMask" key="mask"></div>
      <div class="info" key="info">
        <div ref="info">
        <slot></slot>
        </div>
        <a href="javascript:" class="return iconfont" @click="closeMask">&#xe6aa;</a>
      </div>
    </transition-group>
</template>

<script>
export default {
  name: "UserMask",
  props:['closeMask'],
  mounted() {
    if (this.$refs.info.offsetHeight > window.innerHeight*0.75) {
      this.$refs.info.style.height = window.innerHeight*0.75+'px'
      console.log(window.innerHeight)
      this.$refs.info.style.overflowY = 'scroll'
    }
    if (this.$refs.info.offsetWidth > window.innerWidth*0.85) {
      this.$refs.info.style.width = window.innerWidth*0.85+'px'
    }
  }
}
</script>

<style scoped lang="less">
  //@info-width: 900px;    要更改内容框大小，需要在插槽组件处设置slot的宽度
  .maskBox {
    position: relative;
    z-index: 999;
  }
  .info {
    position: fixed;
    padding: 15px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: #fff;
    border-radius: 6px;
  }

  .return {
    position: fixed;
    display: block;
    width: 36px;
    height: 36px;
    line-height: $height;
    text-align: center;
    border-radius: $height./2;
    right: -40px;
    top: -40px;
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
  .maskAnimation-enter-active{
    transition: all .4s;
  }
  .maskAnimation-enter{
    opacity: 0;
    margin-top: -4%;
  }
  .maskAnimation-enter-to{
    opacity: 1;
    margin-top: 0;
  }
</style>
