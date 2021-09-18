<template>
  <div class="container">
    <div class="mask" @click="closeMask(false)"></div>
    <div class="info">
      <img :src="selectedImg.url" alt="">
      <div class="upper">上传者：{{selectedImg.upper}}</div>
      <div class="date">上传于：{{formatDate(selectedImg.date,true)}}</div>
      <div class="description">照片描述：{{selectedImg.description}}</div>
      <a href="javascript:" class="return iconfont" @click="closeMask(false)">&#xe6aa;</a>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ImgInfoMask",
  props:['closeMask'],
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['selectedImg'])
  },
  methods: {
    formatDate(time, detailMode=false) {
      let date = new Date(time*1000)
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      if (detailMode) {
        return y + "年" + MM + "月" + d + "日 " + h + ":" + m + ':'+ s;
      }else {
        return y + "-" + MM + "-" + d + " " + h + ":" + m;
      }
    }
  },
}
</script>

<style scoped lang="less">
  @info-width: 900px;
  .container {
    position: relative;
    z-index: 999;
  }
  .info {
    position: fixed;
    width: @info-width;
    padding: 15px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: #fff;
    border-radius: 6px;
    img {
      width: 100%;
      margin-bottom: 10px;
    }
    div {
      margin-bottom: 8px;
    }
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
</style>
